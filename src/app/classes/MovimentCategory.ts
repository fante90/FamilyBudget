import { MovimentTypes } from './MovimentsTypes';
import { FamilyBudgetDBService } from '../services/familyBudgetDB.service';

// Classe che rappresenta la categoria di un movimento
export class MovimentCategory implements IMovimentCategory {
    ID: number;
    description: string;
    type: string;
    color: string;
    icon: string;
    private errors: Array<string>;
    static colors = [
        { code: 'primary', description: 'Blu' },
        { code: 'secodary', description: 'Azzurro' },
        { code: 'tertiary', description: 'Arancione' },
        { code: 'dark', description: 'Nero' },
        { code: 'medium', description: 'Grigio' },
        { code: 'light', description: 'Grigio chiaro' },
    ];
    static myObjStoreName = 'movimentCategories';

    constructor(ID: number, description: string, type: string, color: string, icon: string) {
        this.ID = ID;
        this.description = description;
        this.type = type;
        this.color = color;
        this.icon = icon;
    }

    public static getColors() {
        return this.colors;
    }
    public getErrors() {
        return this.errors;
    }

    /**
     * Metodo per validare la categoria prima di un salvataggio su db
     */
    public async valid(AppDBService: FamilyBudgetDBService): Promise<boolean> {
        this.errors = []; // Azzero l'array degli errori
        if (this.ID) {
            try {
                await AppDBService.getEntry(MovimentCategory.myObjStoreName, this.ID);
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
        // Validazione del colore
        let isValidColor = false;
        MovimentCategory.getColors().forEach(color => {
            if (this.color === color.code) {
                isValidColor = true;
            }
        });
        if (!isValidColor) {
            this.errors.push('Colore - non valido');
        }
        return (this.errors.length === 0);
    }

    /**
     * Metodo per inserire/aggiornare una categoria
     * @param AppDBService riferimento al db
     */
    public async save(AppDBService: FamilyBudgetDBService): Promise<boolean> {
        try {
            const entryData = {
                description: this.description,
                type: this.type,
                color: this.color,
                icon: this.icon
            };
            if (this.ID) { // Modifica
                await AppDBService.updateEntry(MovimentCategory.myObjStoreName, this.ID, entryData);
            } else { // Inserimento
                await AppDBService.insertEntry(MovimentCategory.myObjStoreName, entryData);
            }
        } catch (error) {
            this.errors.push(error);
            return false;
        }
        return true;
    }

    /**
     * Metodo per cancellare una categoria
     * @param AppDBService riferimento al db
     */
    public async delete(AppDBService: FamilyBudgetDBService): Promise<boolean> {
        try {
            // TODO : Valutare se la categoria è usata prima di cancellarla
            await AppDBService.deleteEntry(MovimentCategory.myObjStoreName, this.ID);
        } catch (error) {
            this.errors.push(error);
            return false;
        }
        return true;
    }

    public static async getEntry(AppDBService: FamilyBudgetDBService, ID: number): Promise<IMovimentCategory> {
        try {
            const entry: IMovimentCategory = await AppDBService.getEntry(this.myObjStoreName, ID);
            return entry;
        } catch (error) {
            return null;
        }
    }

    /**
     * Metodo per ottenere l'elenco delle categorie
     */
    public static async getEntries(AppDBService: FamilyBudgetDBService): Promise<Array<IMovimentCategory>> {
        let categories: Array<any> = [];
        categories = await AppDBService.getEntries(this.myObjStoreName, null);
        return categories;
    }
}
