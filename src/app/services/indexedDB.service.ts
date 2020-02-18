import { Injectable } from '@angular/core';

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
     * Metodo che restituisce le entry di un object store eventualmente filtrate
     * @param dbInstance riferimento al db
     * @param objStoreName nome dell'objectStore
     * @param filter eventulae filtro
     * @param direction eventuale ordinamento (next, prev)
     */
    public getEntries(dbInstance: IDBDatabase, objStoreName: string, filter: IDBKeyRange, direction: IDBCursorDirection = 'next'): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            const entries = [];
            const objectStore = dbInstance.transaction(objStoreName).objectStore(objStoreName);
            objectStore.openCursor(filter, direction).onsuccess = (event: any) => {
                const cursor = event.target.result;
                if (cursor) {
                    entries.push(cursor.value);
                    cursor.continue();
                }
            };
            resolve(entries);
        });

        return promise;
    }
}
