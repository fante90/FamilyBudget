import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    /**
     * Effettua il download di un file contenente i dati ricevuti per parametro
     * @param data dati da inserire nel file
     * @param filename nome del file
     * @param type tipo di file
     */
    public download(data, filename, type) {
        const file = new Blob([data], { type });
        if (window.navigator.msSaveOrOpenBlob) { // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        } else { // Others
            const a = document.createElement('a'),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }

    /**
     * Converte una data (formato data o stringa) nel formato ISO-8601: YYYY-MM-DDTHH:mm:ss.sssZ
     */
    public dateToISO(date: any) {
        // Date
        if (!(date instanceof Date)) {
            // stringa
            date = new Date(date);
        }
        return date.toISOString();
    }
}
