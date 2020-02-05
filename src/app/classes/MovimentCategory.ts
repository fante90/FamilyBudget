import { MovimentTypes } from './MovimentsTypes';
import { FamilyBudgetDBService } from '../services/familyBudgetDB.service';
import { IndexedDBService } from '../services/indexedDB.service';

// Classe che rappresenta la categoria di un movimento
export class MovimentCategory {
    private ID: number;
    private description: string;
    private type: string;
    private color: string;
    private icon: string;
    private errors: Array<string>;
    static colors = [
        { code: 'primary', description: 'Blu' },
        { code: 'secodary', description: 'Azzurro' },
        { code: 'tertiary', description: 'Arancione' },
        { code: 'dark', description: 'Nero' },
        { code: 'medium', description: 'Grigio' },
        { code: 'light', description: 'Grigio chiaro' },
    ];
    private myObjStoreName = 'movimentCategories';

    constructor(ID: number, description: string, type: string, color: string, icon: string) {
        this.ID = ID;
        this.description = description;
        this.type = type;
        this.color = color;
        this.icon = icon;
    }

    public getID(): number {
        return this.ID;
    }

    public getDescription(): string {
        return this.description;
    }

    public getType(): string {
        return this.type;
    }

    public getColor(): string {
        return this.color;
    }

    public getIcon(): string {
        return this.icon;
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
    public valid(): boolean {
        this.errors = []; // Azzero l'array degli errori
        if (this.ID) {
            // TODO: verificare che il record esista
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
    public async save(AppDBService: FamilyBudgetDBService): Promise<boolean> {
        try {
            await AppDBService.insertEntry(this.myObjStoreName, {
                description: this.description,
                type: this.type,
                color: this.color,
                icon: this.icon
            });
        } catch (error) {
            this.errors.push(error);
            return false;
        }
        return true;
    }
}
