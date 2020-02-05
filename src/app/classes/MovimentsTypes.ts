// Classe che rappresenta i tipi di movimenti
export class MovimentTypes {
    public static getMovimentTypes(): Array<any> {
        return [
            { code: 'P', description: 'Movimento in ingresso'},
            { code: 'M', description: 'Movimento in uscita'},
            { code: 'I', description: 'Investimento'},
        ]
    }
}
