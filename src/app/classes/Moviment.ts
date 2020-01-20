import { MovimentCategory } from './MovimentCategory';

// Classe che rappresenta un movimento in entrata, in uscita o un investimento
export class Moviment {
    private category: MovimentCategory;
    private date: Date;
    private note: string;
    private value: number;

    constructor(category: MovimentCategory, date: Date, note: string, value: number) {
        this.category = category;
        this.date = date;
        this.note = note;
        this.value = value;
    }

    public getCategory(): MovimentCategory {
        return this.category;
    }

    public getDate(): string {
        return this.date.getDate() + '/' + (this.date.getMonth() + 1) + '/' + this.date.getFullYear();
    }

    public getNote(): string {
        return this.note;
    }

    public getValue(): string {
        const value = Math.round(this.value * 100) / 100;
        return value.toFixed(2);
    }
}