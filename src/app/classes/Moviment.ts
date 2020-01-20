// Classe che rappresenta un movimento in entrata o in uscita
export class Moviment {
    private color: string;
    private icon: string;
    private date: Date;
    private note: string;
    private value: number;

    constructor(color: string, icon: string, date: Date, note: string, value: number) {
        this.color = color;
        this.icon = icon;
        this.date = date;
        this.note = note;
        this.value = value;
    }

    public getColor() {
        return this.color;
    }

    public getIcon() {
        return this.icon;
    }

    public getDate() {
        return this.date.getDate() + '/' + (this.date.getMonth() + 1) + '/' + this.date.getFullYear();
    }

    public getNote() {
        return this.note;
    }

    public getValue() {
        const value = Math.round(this.value * 100) / 100;
        return value.toFixed(2);
    }
}