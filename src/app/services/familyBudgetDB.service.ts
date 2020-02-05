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
            this.indexedDBService.insertEntry(this.dbInstance, objStoreName, entry).then(() =>{
                resolve();
            }, (error) => {
                reject(error);
            });
        });
        return promise;
    }
}
