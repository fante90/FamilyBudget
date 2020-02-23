// Classe che rappresenta i tipi di movimenti
export class MovimentTypes {
    private static movimentTypes: Array<IMovimentType> = [
        { code: 'P', description: 'Movimento in ingresso' },
        { code: 'M', description: 'Movimento in uscita' },
        { code: 'I', description: 'Investimento' }
    ];

    public static getMovimentTypes(): Array<IMovimentType> {
        return this.movimentTypes;
    }

    /**
     * Restituisce il tipo di movimento relativo al codice ricevuto per parametro
     * @param code codice del tipo di movimento
     */
    public static getMovimentType(code: string): IMovimentType {
        let rtnType: IMovimentType = { code: '', description: '' };
        this.movimentTypes.forEach((type: IMovimentType) => {
            if (type.code === code) {
                rtnType = type;
            }
        });
        return rtnType;
    }

}
