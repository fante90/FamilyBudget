interface IMoviment {
    _id: string;
    id_category: string;
    type: string;
    date: Date;
    note: string;
    value: number;
    category: IMovimentCategory;
}