import { Component, Output, EventEmitter, OnInit, NgZone, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FbDateFilterToolbarPopoverComponent } from './fb-date-filter-toolbar-popover/fb-date-filter-toolbar-popover.component';
import { createGesture } from '@ionic/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-fb-date-filter-toolbar',
    templateUrl: './fb-date-filter-toolbar.component.html',
    styleUrls: ['./fb-date-filter-toolbar.component.scss'],
})

export class FbDateFilterToolbarComponent implements OnInit {

    @Input() initConfig; // permette di forzare in inizializzazione range e offset 
    @Input() saveConfig = true; // determina se salvare in localStorage la configurazione scelta
    @Output() changed = new EventEmitter<any>();
    private currRange = '';
    private offset = 0;
    private monthsLabel = ['GENNAIO', 'FEBBRAIO', 'MARZO', 'APRILE', 'MAGGIO', 'GIUGNO', 'LUGLIO', 'AGOSTO', 'SETTEMBRE', 'OTTOBRE', 'NOVEMBRE', 'DICEMBRE'];
    private shortMonthsLabel = ['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DIC'];
    public filterLabel = '';
    public filterIcon = '';
    private lastOnSwipe = Date.now();

    constructor(private popoverCtrl: PopoverController, private changeDetector: ChangeDetectorRef, private ngZone: NgZone) {}

    ngOnInit() {
        // Verifico se presente una configurazione da forzare in inizializzazione
        if (this.initConfig) {
            this.currRange = this.initConfig.range;
            this.offset = parseInt(this.initConfig.offset, 10);
        } else {
            // Verifico se ho una configurazione salvata in local storage
            let objLSDateFilter: any = window.localStorage.getItem('fb-date-filter');
            if (objLSDateFilter) {
                objLSDateFilter = JSON.parse(objLSDateFilter);
                this.currRange = objLSDateFilter.range;
                this.offset = objLSDateFilter.offset;
            } else {
                // Inizializzo la configurazione default: mese corrente
                this.currRange = 'MONTH';
                this.offset = 0;
                this.updateOnLocalStorage();
            }
        }

        this.updateIconAndLabel();

        // Traccio lo swipe sul componente così da usarlo per cambiare l'offset dell'intervallo di filtro
        const gesture = createGesture({
            el: document.querySelector('.date-toolbar'),
            threshold: 45, // deve esserci uno swipe di almeno 45px perchè l'handler venga eseguito
            gestureName: 'swipe',
            // ngZone serve a dire ad Angular che il metodo viene eseguito nel suo contesto così che venga aggiornata l'interfaccia
            onMove: ev => this.ngZone.run(() => this.onSwipeHandler(ev)),
        });
        gesture.enable();
    }

    /**
     *  determina se lo swipe è a destra o a sinistra e aggiorna l'offset di conseguenza
     */
    public onSwipeHandler(ev) {
        const now = Date.now();
        // aggiorno l'offset solo se è passato più di 100 millisecondi dall'ultimo richiamo dell'handler
        if (Math.abs(now - this.lastOnSwipe) >= 100) {
            this.lastOnSwipe = Date.now();
            if ((ev.startX - ev.currentX) < 0) { // swipe verso destra, diminuisco l'offset
                this.goPrev();
            } else { // swipe verso sinistra, lo aumento
                this.goNext();
            }
        } else {
            this.lastOnSwipe = Date.now();
        }

    }

    /**
     * Metodo che scorre al periodo di filtro precedente
     */
    goPrev() {
        this.offset -= 1;
        this.updateOnLocalStorage();
        this.updateIconAndLabel();
    }

    /**
     * Metodo che scorre al periodo di filtro successivo
     */
    goNext() {
        this.offset += 1;
        this.updateOnLocalStorage();
        this.updateIconAndLabel();
    }

    /**
     * Metodo che ricalcola l'icona e la label da visualizzare nella toolbar e data inizio e fine da inviare all'elemento padre
     */
    private updateIconAndLabel() {
        let startDate = new Date();
        let endDate = new Date();
        switch (this.currRange) {
            case 'TODAY': // Filtro per oggi
                this.filterIcon = 'today-outline';
                startDate = new Date();
                startDate.setHours(0, 0, 0);
                endDate = new Date();
                endDate.setHours(23, 59, 59);
                // aggiungo/sottraggo l'offset di giorni
                startDate.setTime(startDate.getTime() + (this.offset * 1000 * 60 * 60 * 24));
                endDate.setTime(endDate.getTime() + (this.offset * 1000 * 60 * 60 * 24));
                // aggiorno la label
                this.filterLabel = startDate.getDate() + ' ' + this.monthsLabel[startDate.getMonth()] + ' ' + startDate.getFullYear();
                break;
            case 'WEEK': // Filtro per settimana
                this.filterIcon = 'W';
                startDate = new Date();
                startDate.setHours(0, 0, 0);
                while (startDate.getDay() !== 1) { // Cerco il lunedì
                    startDate.setTime(startDate.getTime() + (-1 * 1000 * 60 * 60 * 24));
                }
                endDate = new Date();
                endDate.setHours(23, 59, 59);
                while (endDate.getDay() !== 0) { // Cerco la domenica
                    endDate.setTime(endDate.getTime() + (1000 * 60 * 60 * 24));
                }
                // aggiungo/sottraggo l'offset di settimane
                startDate.setTime(startDate.getTime() + (this.offset * 7 * 1000 * 60 * 60 * 24));
                endDate.setTime(endDate.getTime() + (this.offset * 7 * 1000 * 60 * 60 * 24));
                // aggiorno la label
                this.filterLabel = startDate.getDate() + ' ';
                if (startDate.getMonth() !== endDate.getMonth()) {
                    this.filterLabel += this.shortMonthsLabel[startDate.getMonth()];
                }
                this.filterLabel += ' - ' + endDate.getDate() + ' ' + this.shortMonthsLabel[endDate.getMonth()] + ' ' + endDate.getFullYear();
                break;
            case 'MONTH': // Filtro per mese
                this.filterIcon = 'calendar-outline';
                // calcolo data inizio partendo dalla data corrente
                startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0);
                // aggiungo/sottraggo l'offset di mesi
                startDate.setMonth(startDate.getMonth() + this.offset);
                // calcolo data fine del mese
                endDate = new Date(startDate.getFullYear(), (startDate.getMonth() + 1), 0);
                endDate.setHours(23, 59, 59);
                // aggiorno la label
                this.filterLabel = this.monthsLabel[startDate.getMonth()] + ' ' + startDate.getFullYear();
                break;
            case 'YEAR': // Filtro per anno
                this.filterIcon = 'Y';
                startDate = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0);
                endDate = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59);
                // aggiungo/sottraggo l'offset di anni
                startDate.setFullYear(startDate.getFullYear() + this.offset);
                endDate.setFullYear(endDate.getFullYear() + this.offset);
                endDate.setHours(23, 59, 59);
                // aggiorno la label
                this.filterLabel = 'ANNO ' + startDate.getFullYear();
                break;
        }
        // informo il padre della change, incapsulo in una setTimeout per essere certo che il padre sia inizializzato
        // lo faccio perchè al momento non ho voglia di implementare i subject
        setTimeout(() => {
            this.changed.emit({
                start: startDate,
                end: endDate,
                range: this.currRange 
            });
        }, 1);

    }

    /**
     * Metodo che apre il popover per la scelta dell'intervallo di date da visualizzare
     */
    async chooseDateInterval() {
        const popover = await this.popoverCtrl.create({
            component: FbDateFilterToolbarPopoverComponent,
            componentProps: {
                range: this.currRange // passo l'attuale range selezionato per evidenziarlo nel popover
            }
        });
        popover.present();
        popover.onDidDismiss().then((rtn: any) => {
            if (rtn && rtn.data) {
                this.currRange = rtn.data.range;
                this.offset = 0;
                this.updateOnLocalStorage();
                this.updateIconAndLabel();
            }
        });
    }

    /**
     * Metodo che si occupa di salvare l'ultimo filtro impostato nel local storage
     */
    private updateOnLocalStorage() {
        if(this.saveConfig){
            window.localStorage.setItem('fb-date-filter', JSON.stringify({
                range: this.currRange,
                offset: this.offset
            }));
        }
    }
}
