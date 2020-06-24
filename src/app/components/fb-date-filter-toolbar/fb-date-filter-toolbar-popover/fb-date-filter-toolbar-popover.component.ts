import { Component } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'app-fb-date-filter-toolbar-popover',
    templateUrl: './fb-date-filter-toolbar-popover.component.html',
    styleUrls: ['./fb-date-filter-toolbar-popover.component.scss'],
})

export class FbDateFilterToolbarPopoverComponent {

    public current = '';

    constructor(
        private popoverCtrl: PopoverController,
        private navParams: NavParams,
        private datePicker: DatePicker,
        public platform: Platform
    ) {
        this.current = this.navParams.data.range;
    }

    /**
     * Metodo che restituisce l'intervallo scelto e chiude il popOver
     * @param selectedRange intervallo selezionato
     */
    chooseFilter(selectedRange) {
        this.popoverCtrl.dismiss({ range: selectedRange });
    }

    /**
     * TODO : terminare la then quando si trasformerà la pwa in app nativa
     * Metodo che apre il calendario per la scelta di un giorno specifico e una volta selezionato
     * restituisce intervallo scelto e offset da oggi
     */
    selectDay() {
        this.datePicker.show({
            date: new Date(),
            mode: 'date'
        }).then(
            date => console.log('Got date: ', date),
            err => console.log('Error occurred while getting date: ', err)
        );
    }
}
