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

    public dateToYYYYMMDD(date: any) {
        // Date
        if (!(date instanceof Date)) {
            // stringa
            date = new Date(date);
        }
        return date.getFullYear() + '-' +
            ('00' + (date.getMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getDate()).slice(-2);

    }

    /**
     * Converte un colore esadecimale in rgba
     * @param hex colore esadecimale da convertire
     * @param alpha opacità da 0 a 1
     */
    public hexToRgbA(hex, alpha) {
        let c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length === 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ', ' + alpha + ')';
        }
        throw new Error('Bad Hex');
    }
}
