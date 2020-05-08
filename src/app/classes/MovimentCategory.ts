import { MovimentTypes } from './MovimentsTypes';
import { Entity } from './Entity';

// Classe che rappresenta la categoria di un movimento
export class MovimentCategory extends Entity {
    public description: string;
    public type: string;
    public color: string;
    public icon: string;
    protected fieldProperties = ['_id', 'description', 'type', 'color', 'icon'];

    static entityName = 'movimentCategories';
    static colors = [
        { code: 'tertiary', description: 'Arancione' },
        { code: 'secondary', description: 'Azzurro' },
        { code: 'primary', description: 'Blu' },
        { code: 'medium', description: 'Grigio' },
        { code: 'light', description: 'Grigio chiaro' },
        { code: 'dark', description: 'Nero' },
        { code: 'success', description: 'Verde' }
    ];

    public static getColors() {
        return this.colors;
    }

    /**
     * Metodo per validare la categoria prima di un salvataggio su db
     */
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
     */
    public async save(): Promise<boolean> {
        try {
            const entryData = {
                description: this.description,
                type: this.type,
                color: this.color,
                icon: this.icon
            };
            if (this._id) { // Modifica
                await this.appDBService.updateEntry(this._id, entryData);
            } else { // Inserimento
                await this.appDBService.insertEntry(MovimentCategory.entityName, entryData);
            }
        } catch (error) {
            this.errors.push(error);
            return false;
        }
        return true;
    }
}
