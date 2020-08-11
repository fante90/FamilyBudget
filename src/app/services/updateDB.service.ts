import { Injectable } from '@angular/core';
import { FamilyBudgetDBService } from './familyBudgetDB.service';
import { version } from './../../../package.json';
import { MovimentCategory } from '../classes/MovimentCategory';
import { UIService } from './ui.service';

@Injectable({
    providedIn: 'root'
})
export class UpdateDBService {

    constructor(private appDBService: FamilyBudgetDBService, private uiService: UIService) { }

    /**
     * Verifica se è necessario effettuare un aggiornamento del db in base alla sua versione
     */
    public async checkUpdate() {
        // estraggo la versione del db e verifico se è necessario effettuare degli aggiornamenti sui dati del db
        let currDbVersionDoc = null;
        let needUpdates = false;
        try {
            currDbVersionDoc = await this.appDBService.getEntry('DbVersion:000001');
        } catch (error) {
            needUpdates = true;
        }
        const currDbVersion = (currDbVersionDoc) ? currDbVersionDoc.DbVersion : '';
        if (currDbVersion < '0.0.2') {
            needUpdates = true;
            await this.updateCategoryIconsAndColors();
        }
        if (needUpdates) {
            if (currDbVersionDoc) {
                this.appDBService.deleteEntry('DbVersion:000001').then(() => {
                    this.appDBService.insertEntry('DbVersion', { DbVersion: version });
                });
            } else {
                this.appDBService.insertEntry('DbVersion', { DbVersion: version });
            }
        }
    }

    /**
     * Metodo che aggiorna icona e colore delle categorie caricate in precedenza
     */
    private async updateCategoryIconsAndColors() {
        const loading = await this.uiService.presentLoading({
            message: 'Aggiornamento DB versione 0.0.2'
        });
        const colors = [
            { oldCode: 'tertiary', newCode: '#fec882' },
            { oldCode: 'secondary', newCode: '#b1e6f2' },
            { oldCode: 'primary', newCode: '#74b6ff' },
            { oldCode: 'medium', newCode: '#c0c2cf' },
            { oldCode: 'light', newCode: '#f2f5ff' },
            { oldCode: 'dark', newCode: '#50545e' },
            { oldCode: 'success', newCode: '#10dc60' }
        ];
        const categories = await MovimentCategory.getEntries(this.appDBService);
        for (const category of categories) {
            const col = colors.find((color) => color.oldCode === category.color);
            if (col) {
                category.color = col.newCode;
            }
            category.icon = category.icon.replace('-outline', '').replace('-sharp', '');
            await this.appDBService.updateEntry(category._id, category);
        }
        loading.dismiss();
    }
}
