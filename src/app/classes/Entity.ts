import { FamilyBudgetDBService } from '../services/familyBudgetDB.service';

export abstract class Entity {
    public _id: string;
    protected fieldProperties = ['_id']; // Elenco delle proprietà della classe che rappresentano i campi dell'entità
    protected appDBService: FamilyBudgetDBService;
    protected errors: Array<string> = [];
    static entityName;

    constructor(AppDBService: FamilyBudgetDBService) {
        this.appDBService = AppDBService;
    }

    public abstract valid(): Promise<boolean>;
    public abstract save(): Promise<boolean>;

    /**
     * Metodo che restituisce l'elenco degli errori
     */
    public getErrors() {
        const errors = this.errors;
        this.errors = [];
        return errors;
    }

    /**
     * Metodo per valorizzare le proprietà dell'entity tramite un modello
     */
    public modelToEntity(model: any) {
        const modelKeys: Array<string> = Object.keys(model);
        modelKeys.forEach((key) => {
            if (this.fieldProperties.includes(key)) {
                this[key] = model[key];
            }
        });
    }

    /**
     * metodo per selezionare una specifica entry
     * @param id Id dell'entry
     */
    public async findEntry(id: string): Promise<boolean> {
        try {
            const entry: any = await this.appDBService.getEntry(id);
            this.modelToEntity(entry);
        } catch (error) {
            this.errors.push(error);
            return false;
        }
        return true;
    }

    /**
     * Metodo per cancellare una entry
     */
    public async delete(): Promise<boolean> {
        try {
            await this.appDBService.deleteEntry(this._id);
        } catch (error) {
            this.errors.push(error);
            return false;
        }
        return true;
    }

    /**
     * Metodo per ottenere una specifica entry
     */
    public static async getEntry(appDBService: FamilyBudgetDBService, ID: string): Promise<any> {
        const entry = await appDBService.getEntry(ID);
        return entry;
    }

    /**
     * Metodo per ottenere l'elenco delle entry
     */
    public static async getEntries(
        appDBService: FamilyBudgetDBService,
        desc?: boolean,
        limit?: number,
        customSelector?: any): Promise<Array<any>> {

        let entries: Array<any> = [];
        entries = await appDBService.getEntries(this.entityName, desc, limit, customSelector);
        return entries;
    }
}