import { Injectable } from '@angular/core';
import { IndexedDBService } from './indexedDB.service';

@Injectable({
    providedIn: 'root'
})
export class FamilyBudgetDBService {
    private DB_NAME = 'FamilyBudgetDB';
    private DB_VERSION = 1;
    private dbInstance: IDBDatabase = null;

    constructor(private indexedDBService: IndexedDBService) { }

    /**
     * Metodo per aprire il db, se non esiste o se è ad una versione precedente questo viene creato/aggiornato
     * Da richiamare in fase di inizializzazione dell'app
     */
    public openDB(): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            this.indexedDBService.openDB(this.DB_NAME, this.DB_VERSION).then((data) => {
                this.dbInstance = data.db;
                if (data.updateNeeded) {
                    // è necessario aggiornare il db
                    this.initOrUpdateDB(data.oldVersion);
                    resolve();
                } else {
                    resolve();
                }
            }, (error) => {
                reject(error.code + ' ' + error.message);
            });
        });
        return promise;
    }

    /**
     * Inizializza o aggiorna il db a seconda della versione del db attualmente presente sul browser dell'utente
     * @param currVersion versione del db attualmente presente sul browser dell'utente
     */
    private initOrUpdateDB(currVersion: number) {
        if (currVersion < 1) {
            // Prima versione del db, inizializzo gli object store dei movimenti e delle categorie di movimento
            const structure = [
                {
                    name: 'moviments',
                    key: 'ID',
                    autoIncrement: true,
                    indexes: [
                        {
                            name: 'by_date',
                            field: 'date'
                        },
                        {
                            name: 'by_category',
                            field: 'category'
                        }
                    ]
                },
                {
                    name: 'movimentCategories',
                    key: 'ID',
                    autoIncrement: true,
                    indexes: []
                }
            ];
            this.indexedDBService.createStructure(this.dbInstance, structure);
        }
    }

    /**
     * Metodo che inserisce una nuova entry su un objectStore del database
     * @param objStoreName nome dell'objectStore
     * @param record entry da inserire
     */
    public insertEntry(objStoreName: string, entry: any) {
        const promise = new Promise((resolve, reject) => {
            this.indexedDBService.insertEntry(this.dbInstance, objStoreName, entry).then(() => {
                resolve();
            }, (error) => {
                reject(error);
            });
        });
        return promise;
    }

    /**
     * Metodo che aggiorna una entry di un objectStore del database
     * @param objStoreName nome dell'objectStore
     * @param entryKey chiave dell'entry da aggiornare
     * @param entryUpd valori aggiornati dell'entry
     */
    public updateEntry(objStoreName: string, entryKey: any, entryUpd: any) {
        const promise = new Promise((resolve, reject) => {
            this.indexedDBService.updateEntry(this.dbInstance, objStoreName, entryKey, entryUpd).then(() => {
                resolve();
            }, (error) => {
                reject(error);
            });
        });
        return promise;
    }

    /**
     * Metodo che cancella un entry su un objectStore del database
     * @param objStoreName nome dell'objectStore
     * @param entryKey chiave dell'entry da cancellare
     */
    public deleteEntry(objStoreName: string, entryKey: any) {
        const promise = new Promise((resolve, reject) => {
            this.indexedDBService.deleteEntry(this.dbInstance, objStoreName, entryKey).then(() => {
                resolve();
            }, (error) => {
                reject(error);
            });
        });
        return promise;
    }

    /**
     * Metodo che restituisce una entry di un object store
     * @param objStoreName nome dell'objectStore
     * @param entryKey chiave dell'entry da cancellare
     */
    public getEntry(objStoreName: string, entryKey: any): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            this.indexedDBService.getEntry(this.dbInstance, objStoreName, entryKey).then((entry) => {
                resolve(entry);
            }, (error) => {
                reject(error);
            });
        });
        return promise;
    }

    /**
     * Metodo che restituisce le entry di un object store eventualmente filtrate
     * @param objStoreName nome dell'objectStore
     * @param filter eventulae filtro
     * @param direction eventuale ordinamento (next, prev)
     */
    public getEntries(objStoreName: string, filter: IDBKeyRange, direction: IDBCursorDirection = 'next'): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            this.indexedDBService.getEntries(this.dbInstance, objStoreName, null).then((entries) => {
                resolve(entries);
            });
        });
        return promise;
    }
}
