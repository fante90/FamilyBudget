import { Injectable } from '@angular/core';
import { AngularDelegate } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class IndexedDBService {

    constructor() { }

    /**
     * Metodo per aprire un database, restituisce una Promise
     * Se la promise viene risolta restituisce un oggetto con il riferimento al db e se necessario inzializzare / aggiornare il db
     * Se la promise viene respinta restituisce un oggetto con codice e messaggio di errore
     * @param dbName Nome del db da aprire
     * @param dbVersion Versione del db
     */
    public openDB(dbName: string, dbVersion: number): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            if (!indexedDB) {
                reject({
                    code: -1,
                    message: 'Il tuo browser non supporta IndexedDB'
                });
            }
            const request = indexedDB.open(dbName, dbVersion);
            // apertura db ok
            request.onsuccess = () => {
                resolve({
                    db: request.result,
                    updateNeeded: false
                });
            };
            // apertura db ok ma richiede creazione/aggiornamento
            request.onupgradeneeded = (e) => {
                resolve({
                    db: request.result,
                    updateNeeded: true,
                    oldVersion: e.oldVersion
                });
            };
            // errore in apertura
            request.onerror = () => {
                reject({
                    code: request.error.code,
                    message: request.error.message
                });
            };
            // stesso db aperto in altre tab del browser, db bloccato
            request.onblocked = () => {
                reject({
                    code: -1,
                    message: 'Db già in uso su altre tab del browser'
                });
            };
        });

        return promise;
    }

    /**
     * Metodo per creare la struttura iniziale del db
     * @param dbInstance riferimento al db
     * @param structure array di objectStore con relative proprietà
     */
    public createStructure(dbInstance: IDBDatabase, structure: Array<any>) {
        structure.forEach(objStoreCnf => {
            const objStoreParams: IDBObjectStoreParameters = new Object();
            if (objStoreCnf.key) {
                objStoreParams.keyPath = objStoreCnf.key;
            }
            if (objStoreCnf.autoIncrement) {
                objStoreParams.autoIncrement = objStoreCnf.autoIncrement;
            }
            const objStore = dbInstance.createObjectStore(objStoreCnf.name, objStoreParams);
            objStoreCnf.indexes.forEach(indexCnf => {
                objStore.createIndex(indexCnf.name, indexCnf.field);
            });
        });
    }

    /**
     * Metodo che inserisce una nuova entry su un objectStore del database
     * @param dbInstance riferimento al db
     * @param objStoreName nome dell'objectStore
     * @param entry entry da inserire
     */
    public insertEntry(dbInstance: IDBDatabase, objStoreName: string, entry: any): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            const transaction = dbInstance.transaction(objStoreName, 'readwrite');
            const objStore = transaction.objectStore(objStoreName);
            objStore.add(entry);
            // Inserimento entry ok
            transaction.oncomplete = () => {
                resolve();
            };
            // Inserimento entry ko
            transaction.onerror = () => {
                reject(transaction.error);
            };
        });

        return promise;
    }

    /**
     * Metodo che aggiorna una entry di un objectStore del database
     * @param dbInstance riferimento al db
     * @param objStoreName nome dell'objectStore
     * @param entryKey chiave dell'entry da aggiornare
     * @param entryUpd valori aggiornati dell'entry
     */
    public updateEntry(dbInstance: IDBDatabase, objStoreName: string, entryKey: any, entryUpd: any): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            const transaction = dbInstance.transaction(objStoreName, 'readwrite');
            const objStore = transaction.objectStore(objStoreName);
            const request = objStore.get(entryKey);
            // entry trovata, eseguo l'aggiornamento
            request.onsuccess = (event: any) => {
                let data = event.target.result;
                data = Object.assign(data, entryUpd);
                const requestUpdate = objStore.put(data);
                // Aggiornamento entry ok
                requestUpdate.onsuccess = () => {
                    resolve();
                };
                // Aggiornamento entry ko
                requestUpdate.onerror = () => {
                    reject(requestUpdate.error.message);
                };
            };
            // entry non trovata
            request.onerror = () => {
                reject(request.error.message);
            };
        });

        return promise;
    }

    /**
     * Metodo che cancella una entry di un objectStore del database
     * @param dbInstance riferimento al db
     * @param objStoreName nome dell'objectStore
     * @param entryKey chiave dell'entry da cancellare
     */
    public deleteEntry(dbInstance: IDBDatabase, objStoreName: string, entryKey: any): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            const transaction = dbInstance.transaction(objStoreName, 'readwrite');
            const objStore = transaction.objectStore(objStoreName);
            objStore.delete(entryKey);
            // cancellazione entry ok
            transaction.oncomplete = () => {
                resolve();
            };
            // cancellazione entry ko
            transaction.onerror = () => {
                reject(transaction.error);
            };
        });

        return promise;
    }

    /**
     * Metodo che restituisce una entry di un object store
     * @param dbInstance riferimento al db
     * @param objStoreName nome dell'objectStore
     * @param entryKey chiave dell'entry da restituire
     */
    public getEntry(dbInstance: IDBDatabase, objStoreName: string, entryKey: any): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            const transaction = dbInstance.transaction(objStoreName, 'readwrite');
            const objStore = transaction.objectStore(objStoreName);
            const request = objStore.get(entryKey);
            // entry trovata
            request.onsuccess = (event: any) => {
                resolve(event.target.result);
            };
            // entry non trovata
            request.onerror = () => {
                reject(request.error.message);
            };
        });

        return promise;
    }

    /**
     * Metodo che restituisce le entry di un object store eventualmente filtrate
     * @param dbInstance riferimento al db
     * @param objStoreName nome dell'objectStore
     * @param filter eventulae filtro
     * @param direction eventuale ordinamento (next, prev)
     */
    public getEntries(
        dbInstance: IDBDatabase,
        objStoreName: string,
        filter: IDBKeyRange,
        direction: IDBCursorDirection = 'next'
    ): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            const entries = [];
            const objectStore = dbInstance.transaction(objStoreName).objectStore(objStoreName);
            objectStore.openCursor(filter, direction).onsuccess = (event: any) => {
                const cursor = event.target.result;
                if (cursor) {
                    entries.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(entries);
                }
            };
        });

        return promise;
    }
}
