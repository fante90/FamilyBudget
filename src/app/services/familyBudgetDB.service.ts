import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

@Injectable({
    providedIn: 'root'
})
export class FamilyBudgetDBService {
    private DB_NAME = 'FamilyBudgetDB';
    private dbInstance: PouchDB.Database = null;

    constructor() {
        PouchDB.plugin(PouchDBFind);
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
            resolve();
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
                        resolve();
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
                resolve();
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
                resolve();
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
        const promise = new Promise<Array<{}>>((resolve, reject) => {
            if (customSelector) {
                // in questo caso diventa necessario creare un indice, deduco i campi dell'indice dal selector ricevuto
                this.dbInstance.createIndex({
                    index: { fields: Object.keys(customSelector) }
                }).then(() => {
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
                        limit: (limit) ? limit : null
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
                    limit: (limit) ? limit : null
                }).then((results) => {
                    resolve(results.docs);
                }).catch((error) => {
                    reject(error);
                });
            }
        });
        return promise;
    }
}
