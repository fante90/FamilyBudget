// Classe che rappresenta la categoria di un movimento
export class MovimentCategory {
    private ID: number;
    private description: string;
    private type: string;
    private color: string;
    private icon: string;

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
}
