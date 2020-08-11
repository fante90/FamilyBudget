interface IMoviment {
    _id: string;
    id_category: string;
    type: string;
    date: string;
    note: string;
    value: number;
    category: IMovimentCategory;
}