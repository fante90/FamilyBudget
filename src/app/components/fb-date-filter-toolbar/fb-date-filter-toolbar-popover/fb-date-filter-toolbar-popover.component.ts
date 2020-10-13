import { Component } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { UIService } from 'src/app/services/ui.service';

@Component({
    selector: 'fb-date-filter-toolbar-popover',
    templateUrl: './fb-date-filter-toolbar-popover.component.html',
    styleUrls: ['./fb-date-filter-toolbar-popover.component.scss'],
})

export class FbDateFilterToolbarPopoverComponent {

    public current = '';
    private offset = 0;
    private startCustDate = null;
    private endCustDate = null;

    constructor(
        private popoverCtrl: PopoverController,
        private navParams: NavParams,
        private uiService: UIService
    ) {
        this.current = this.navParams.data.range;
        this.offset = parseInt(this.navParams.data.offset, 10);
        this.startCustDate = this.navParams.data.startCustDate;
        this.endCustDate = this.navParams.data.endCustDate;
    }

    /**
     * Metodo che restituisce l'intervallo scelto e chiude il popOver
     * @param selectedRange intervallo selezionato
     */
    chooseFilter(selectedRange) {
        this.popoverCtrl.dismiss({ range: selectedRange });
    }

    /**
     * Metodo che apre il calendario per la scelta di un giorno specifico
     * restituisce intervallo scelto e offset da oggi
     */
    async selectDay() {
        const now = new Date();
        now.setHours(0, 0, 0);
        let dateDefValue = now.getFullYear() + '-' + ('00' + (now.getMonth() + 1)).slice(-2) + '-' + ('00' + now.getDate()).slice(-2);
        // se presente un offset che identifica che è stato selezionato un giorno in precedenza propongo quest'ultimo
        if(this.offset !== 0){
            const tmpDate = new Date(now.getTime() + (1000 * 60 * 60 * 24 * this.offset));
            dateDefValue = tmpDate.getFullYear() + '-' + ('00' + (tmpDate.getMonth() + 1)).slice(-2) + '-' + ('00' + tmpDate.getDate()).slice(-2);
        }
        const alert = await this.uiService.presentAlert({
            header: 'Seleziona un giorno',
            inputs: [
                {
                    name: 'day',
                    type: 'date',
                    value: dateDefValue
                }
            ],
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    cssClass: 'medium'
                },
                {
                    text: 'Conferma',
                    handler: (data) => {
                        if (data.day) {
                            const selectedDay = new Date(data.day);
                            const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0);
                            const timeOffset = selectedDay.getTime() - today.getTime();
                            this.popoverCtrl.dismiss({ range: 'TODAY', offset: (timeOffset / 1000 / 60 / 60 / 24) });
                        } else {
                            return false;
                        }
                    }
                }
            ]
        });
        alert.present();
    }

    /**
     * Metodo che apre una modale per la scelta di un periodo custom specificando data inizio e fine
     * restituisce intervallo scelto e le due date
     */
    async selectPeriod() {
        const now = new Date();
        now.setHours(0, 0, 0);
        const dateDefValue = now.getFullYear() + '-' + ('00' + (now.getMonth() + 1)).slice(-2) + '-' + ('00' + now.getDate()).slice(-2);
        // se presente un valore selezionato in precedenza per la data di inizio propongo quest'ultimo
        let dateDefValueStart = dateDefValue;
        if (this.startCustDate) {
            const tmpDate = new Date(this.startCustDate);
            dateDefValueStart = tmpDate.getFullYear() + '-' + ('00' + (tmpDate.getMonth() + 1)).slice(-2) + '-' + ('00' + tmpDate.getDate()).slice(-2);
        }
        // idem per la data di fine
        let dateDefValueEnd = dateDefValue;
        if (this.endCustDate) {
            const tmpDate = new Date(this.endCustDate);
            dateDefValueEnd = tmpDate.getFullYear() + '-' + ('00' + (tmpDate.getMonth() + 1)).slice(-2) + '-' + ('00' + tmpDate.getDate()).slice(-2);
        }
        const alert = await this.uiService.presentAlert({
            header: 'Seleziona un periodo',
            inputs: [
                {
                    name: 'startDay',
                    type: 'date',
                    value: dateDefValueStart
                },
                {
                    name: 'endDay',
                    type: 'date',
                    value: dateDefValueEnd
                }
            ],
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    cssClass: 'medium'
                },
                {
                    text: 'Conferma',
                    handler: (data) => {
                        if (data.startDay && data.endDay) {
                            const startDay = new Date(data.startDay);
                            const endDay = new Date(data.endDay);
                            endDay.setHours(23, 59, 59);
                            if (endDay.getTime() < startDay.getTime()) {
                                return false;
                            }
                            this.popoverCtrl.dismiss({ range: 'PERIOD', startDate: startDay, endDate: endDay });
                        } else {
                            return false;
                        }
                    }
                }
            ]
        });
        alert.present();
    }
}
