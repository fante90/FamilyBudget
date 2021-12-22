import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import { Observable } from 'rxjs';
// import PouchDBDebug from 'pouchdb-debug';

@Injectable({
    providedIn: 'root'
})
export class FamilyBudgetDBService {
    private DB_NAME = 'FamilyBudgetDB';
    private dbInstance: PouchDB.Database = null;

    constructor() {
        PouchDB.plugin(PouchDBFind);
        // PouchDB.plugin(PouchDBDebug);
        // PouchDB.debug.enable('pouchdb:find');
    }

    /**
     * Metodo che apre la connessione al db
     * Da richiamare in fase di inizializzazione dell'app
     */
    public openDB(): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            if (!this.dbInstance) {
                this.dbInstance = new PouchDB(this.DB_NAME);
            }
            resolve(true);
        });
        return promise;
    }

    /**
     * Metodo che inserisce una nuova entry nel database
     * @param record entry da inserire
     */
    public insertEntry(entityName: string, entry: any) {
        const promise = new Promise((resolve, reject) => {
            let id = '000001';
            // ottengo l'ultimo id per la stessa entità
            this.getEntries(entityName, true, 1).then(
                (lastDocs: Array<any>) => {
                    if (lastDocs && lastDocs.length > 0) {
                        const lastId: number = parseInt(lastDocs[0]._id.replace(entityName + ':', ''), 10);
                        id = ('00000' + (lastId + 1).toString()).slice(-6);
                    }
                    entry._id = entityName + ':' + id;
                    entry.entity = entityName;
                    this.dbInstance.put(entry).then(() => {
                        resolve(true);
                    }).catch((error) => {
                        reject(error);
                    });
                },
                (error) => {
                    reject(error);
                }
            );
        });
        return promise;
    }

    /**
     * Metodo che aggiorna una entry del database
     * @param entryKey chiave dell'entry da aggiornare
     * @param entryUpd valori aggiornati dell'entry
     */
    public updateEntry(entryKey: string, entryUpd: any) {
        const promise = new Promise((resolve, reject) => {
            this.dbInstance.get(entryKey).then((entry) => {
                entry = Object.assign(entry, entryUpd);
                return this.dbInstance.put(entry);
            }).then(() => {
                resolve(true);
            }).catch((error) => {
                reject(error);
            });
        });
        return promise;
    }

    /**
     * Metodo che cancella un entry del database
     * @param entryKey chiave dell'entry da cancellare
     */
    public deleteEntry(entryKey: string) {
        const promise = new Promise((resolve, reject) => {
            this.dbInstance.get(entryKey).then((entry) => {
                return this.dbInstance.remove(entry);
            }).then(() => {
                resolve(true);
            }).catch((error) => {
                reject(error);
            });
        });
        return promise;
    }

    /**
     * Metodo che restituisce un entry del database
     * @param entryKey chiave dell'entry che si vuole ottenere
     */
    public getEntry(entryKey: string): Promise<any> {
        const promise = new Promise<{}>((resolve, reject) => {
            this.dbInstance.get(entryKey).then((entry) => {
                resolve(entry);
            }).catch((error) => {
                reject(error);
            });
        });
        return promise;
    }

    /**
     * Metodo che restituisce le entry di un'entità
     * @param entityName nome dell'entità
     * @param desc ordina in modo decrescente
     * @param limit numero di record da restituire
     * @param customSelector permette di definire un filtro sui dati
     */
    public getEntries(entityName: string, desc?: boolean, limit?: number, customSelector?: any): Promise<Array<any>> {
        const promise = new Promise<Array<any>>((resolve, reject) => {
            if (customSelector) {
                // in questo caso diventa necessario creare un indice, deduco i campi dell'indice dal selector ricevuto
                this.dbInstance.createIndex({
                    index: {
                        fields: Object.keys(customSelector),
                        ddoc: Object.keys(customSelector).join('_')
                    }
                }).then((result) => {
                    // costruisco l'array dei campi da passare nella proprietà sort
                    const fields = Object.keys(customSelector);
                    const sort = [];
                    fields.forEach(field => {
                        const obj = {};
                        obj[field] = (desc) ? 'desc' : 'asc';
                        sort.push(obj);
                    });
                    this.dbInstance.find({
                        selector: customSelector,
                        sort,
                        // non uso null in caso non sia impostato per evitare bug libreria che non considera questo caso
                        // quando deve usare campi di indice in memoria
                        limit: (limit) ? limit : 999999,
                        use_index: fields.join('_')
                    }).then((results) => {
                        resolve(results.docs);
                    }).catch((error) => {
                        reject(error);
                    });
                }).catch((error) => {
                    reject(error);
                });
            } else {
                this.dbInstance.find({
                    selector: {
                        _id: {
                            $gt: entityName + ':',
                            $lt: entityName + ':\uffff'
                        },
                    },
                    sort: [{ _id: (desc) ? 'desc' : 'asc' }],
                    limit: (limit) ? limit : 999999
                }).then((results) => {
                    resolve(results.docs);
                }).catch((error) => {
                    reject(error);
                });
            }
        });
        return promise;
    }

    /**
     * Effettua il backup del db, restituisce l'array stringhificato dei documenti
     */
    public backup(onlyEntities: boolean): Promise<string> {
        const promise = new Promise<string>((resolve, reject) => {
            this.dbInstance.allDocs({
                include_docs: true,
                attachments: true
            }).then((result) => {
                let docs: any = result.rows.map(({ doc }) => doc);
                if (onlyEntities) {
                    docs = docs.filter(doc => doc.entity !== undefined);
                }
                resolve(JSON.stringify(docs));
            }).catch((error) => {
                reject(error);
            });
        });

        return promise;
    }

    /**
     * Data una stringa che rappresenta i documenti del backup, svuota il db e lo ripristina
     */
    public restoreBackup(backupStr) {
        const promise = new Promise((resolve, reject) => {
            const docs: any = JSON.parse(backupStr);
            // verifico che la stringa ricevuta sia un array
            if (!Array.isArray(docs)) {
                reject('Contenuto del backup non valido');
            }
            // e che tutti i documenti abbiano almeno le proprietà _id e entity
            const validDocs = docs.reduce((vd, doc) => {
                return vd && doc._id !== undefined && doc.entity !== undefined;
            }, true);
            if (!validDocs) {
                reject('Contenuto del backup non valido');
            }
            // cancello il db
            this.dbInstance.destroy().then(() => {
                this.dbInstance = null;
                // lo ricreo pulito
                this.openDB().then(() => {
                    // ripristino il backup
                    this.dbInstance.bulkDocs(
                        docs,
                        { new_edits: false } // non modifica la revisione del documento
                    ).then(() => resolve(true))
                        .catch((error) => reject(error));
                }).catch((error) => reject(error));
            }).catch((error) => reject(error));
        });
        return promise;
    }

    /**
     * Sincronizza il db con un db remoto
     */
    public sync(): Observable<any> {
        let observeSync = null;
        if (this.dbInstance) {
            // verifico se è stato configurato un db remoto
            observeSync = new Observable((observer) => {
                try {
                    this.getEntry('remoteDb:000001').then((remoteDbDoc) => {
                        const remoteDB = new PouchDB(remoteDbDoc.remoteDbUrl);
                        // Prima sincronizzazione utile a determinare se il db remoto è disponibile
                        this.dbInstance.sync(remoteDB).on('complete', () => {
                            // db sincronizzato, attivo la sincronizzazione live
                            this.dbInstance.sync(remoteDB, {
                                live: true,
                                retry: true
                            }).on('change', (change) => {
                                // è stata fatta una modifica
                                observer.next({ state: 'change', data: change});
                            }).on('paused', (info) => {
                                // stato raggiunto una volta terminata una sincronizzazione o se si va offline
                                observer.next({ state: 'paused', data: info});
                            }).on('active', () => {
                                // stato eseguito quando si avvia per la prima volta o si riattiva la sincronizzazione dopo l'offline
                                observer.next({ state: 'active', data: null});
                            }).on('complete', (info) => {
                                // lanciato solo se viene interrotta la sincronizzazione
                                // TODO valutare se al change del documento che contiene la connessione far scattare questo evento
                                observer.next({ state: 'complete', data: info});
                            }).on('error', (err) => {
                                // lanciato se si verifica un errore, con la configurazione "live" non dovrebbe mai essere richiamato
                                observer.next({ state: 'error', data: err});
                            });
                        }).on('error', (err) => {
                            // url remota non valida o offline
                            observer.next({ state: 'error', data: err});
                        });
                    }, (error) => {
                        // db remoto non configurato
                        observer.error('no remote db');
                    });
                } catch (error) {
                    observer.error(error);
                }
            });
        }
        return observeSync;
    }
}
