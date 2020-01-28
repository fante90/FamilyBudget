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
            request.onupgradeneeded = () => {
                resolve({
                    db: request.result,
                    updateNeeded: true
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
                })
            };
        });

        return promise;
    }
}
