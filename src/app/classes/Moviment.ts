import { MovimentCategory } from './MovimentCategory';
import { Entity } from './Entity';
import { MovimentTypes } from './MovimentsTypes';
import { FamilyBudgetDBService } from '../services/familyBudgetDB.service';

// Classe che rappresenta un movimento in entrata, in uscita o un investimento
export class Moviment extends Entity {
    public id_category: string;
    public type: string;
    public date: Date;
    public note: string;
    public value: number;
    protected fieldProperties = ['_id', 'id_category', 'type', 'date', 'note', 'value'];

    static entityName = 'moviments';

    public async valid(): Promise<boolean> {
        this.errors = []; // Azzero l'array degli errori
        if (this._id) {
            try {
                await this.appDBService.getEntry(this._id);
            } catch (error) {
                this.errors.push(error);
                return false;
            }
        }
        // Validazione del tipo di movimento
        let isValidType = false;
        MovimentTypes.getMovimentTypes().forEach(type => {
            if (this.type === type.code) {
                isValidType = true;
            }
        });
        if (!isValidType) {
            this.errors.push('Tipo di movimento - non valido');
        }
        // Valido l'importo inserito che deve essere maggiore di 0
        if (this.value <= 0) {
            this.errors.push('L\'importo deve essere maggiore di zero');
        }
        // Verifico che la categoria esista e sia dello stesso tipo del movimento
        try {
            const catTmp: IMovimentCategory = await MovimentCategory.getEntry(this.appDBService, this.id_category);
            if (catTmp.type !== this.type) {
                this.errors.push('Categoria - non valida');
            }

        } catch (error) {
            this.errors.push('Categoria - non valida');
        }
        return (this.errors.length === 0);
    }

    /**
     * Metodo per inserire/aggiornare un movimento
     */
    public async save(): Promise<boolean> {
        try {
            const entryData = {
                id_category: this.id_category,
                type: this.type,
                date: this.date,
                note: this.note,
                value: this.value
            };
            if (this._id) { // Modifica
                await this.appDBService.updateEntry(this._id, entryData);
            } else { // Inserimento
                await this.appDBService.insertEntry(Moviment.entityName, entryData);
            }
        } catch (error) {
            this.errors.push(error);
            return false;
        }
        return true;
    }

    /**
     * Metodo per ottenere una specifica entry
     */
    public static async getEntry(appDBService: FamilyBudgetDBService, ID: string): Promise<IMoviment> {
        const entry: IMoviment = await super.getEntry(appDBService, ID);
        // Valorizzo anche i dati della categoria di appartenenza
        if (entry) {
            entry.category = await MovimentCategory.getEntry(appDBService, entry.id_category);
        }
        return entry;
    }

    /**
     * Metodo per ottenere l'elenco delle entry
     */
    public static async getEntries(
        appDBService: FamilyBudgetDBService,
        desc?: boolean,
        limit?: number,
        customSelector?: any): Promise<Array<IMoviment>> {

        let entries: Array<IMoviment> = [];
        entries = await appDBService.getEntries(this.entityName, desc, limit, customSelector);
        for (const entry of entries) {
            // Valorizzo anche i dati della categoria di appartenenza
            entry.category = await MovimentCategory.getEntry(appDBService, entry.id_category);
        }

        return entries;
    }
}
