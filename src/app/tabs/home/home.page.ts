import { Component } from '@angular/core';
import { Moviment } from '../../classes/Moviment';
import { UIService } from '../../services/ui.service';
import { AddMovimentModalPage } from '../../modals/add-moviment-modal/add-moviment-modal.page';
import { MovimentCategory } from 'src/app/classes/MovimentCategory';
import { FamilyBudgetDBService } from 'src/app/services/familyBudgetDB.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class Tab1Page {

  public moviments: Array<IMoviment>;
  private listDateFilter: any = null;
  private daysDateFilter = 30;
  public yearlyBalance = '';

  constructor(
    private appDBService: FamilyBudgetDBService,
    private uiService: UIService) {
    // Imposto come filtro di date per la lista gli ultimi 30 giorni
    this.setListDateFilter(30);
    // Richiamo il metodo per calcolare il bilancio annuale
    this.calcYearlyBalance();
  }

  ionViewDidEnter() {
    this.refreshList();
  }

  public setListDateFilter(days: number) {
    this.daysDateFilter = days;
    // Alla data fine (adesso) aggiungo un minuto per far si che vengano inclusi movimenti caricati in questo minuto
    const endDateF = new Date(new Date().getTime() + (1000 * 60));
    const tmpMilliseconds = endDateF.getTime();
    const startDateF = new Date(tmpMilliseconds - (1000 * 60 * 60 * 24 * days));
    this.listDateFilter = {
      entity: Moviment.entityName,
      date: {
        $gt: startDateF.toJSON(),
        $lt: endDateF.toJSON()
      }
    };
  }

  /**
   * Metodo utilizzato dal action button in basso a destra
   */
  public newOperation() {
    this.uiService.presentActionSheet({
      header: 'Seleziona il tipo di operazione:',
      buttons: [
        {
          text: 'Registra entrata',
          icon: 'arrow-down-outline',
          handler: async () => {
            const modal = await this.uiService.presentModal(AddMovimentModalPage, { mvType: 'P' });
            modal.onDidDismiss().then(() => {
              this.refreshList();
            });
          }
        }, {
          text: 'Registra uscita',
          icon: 'arrow-up-outline',
          handler: async () => {
            const modal = await this.uiService.presentModal(AddMovimentModalPage, { mvType: 'M' });
            modal.onDidDismiss().then(() => {
              this.refreshList();
            });
          }
        }, {
          text: 'Registra investimento',
          icon: 'cash-outline',
          handler: async () => {
            const modal = await this.uiService.presentModal(AddMovimentModalPage, { mvType: 'I' });
            modal.onDidDismiss().then(() => {
              this.refreshList();
            });
          }
        }
      ]
    });
  }

  /**
   * Metodo che inizializza/aggiorna l'elenco degli ultimi movimenti
   */
  public refreshList(event = null) {
    Moviment.getEntries(this.appDBService, true, null, this.listDateFilter).then(result => {
      this.moviments = result;
      if (event) {
        event.target.complete();
      }
    });
  }

  /**
   * Metodo che calcolo il bilancio annuale in base alla somma dei movimenti dal 1 gennaio a oggi
   */
  private calcYearlyBalance() {
    const selector = {
      entity: Moviment.entityName,
      date: {
        $gt: new Date(new Date().getFullYear(), 0, 1, 0, 0).toJSON(), // 1 gennaio anno corrente
        $lt: new Date(new Date().getTime() + (1000 * 60)) // ora + un minuto per essere certo di prendere tutti i movimenti
      }
    };
    Moviment.getEntries(this.appDBService, false, null, selector).then(result => {
      let sum = 0;
      result.forEach(moviment => {
        if (moviment.type !== 'I') { // Ignoro per ora gli investimenti
          sum += (moviment.value * (moviment.type === 'P' ? 1 : -1));
        }
      });
      this.yearlyBalance = sum.toFixed(2);
    });
  }

  /**
   * Medoto che apre la modale di selezione del filtro di data della lista
   */
  public openSetListDateFilter() {
    this.uiService.presentAlert({
      header: 'Seleziona il filtro di data',
      inputs: [
        {
          name: 'days',
          type: 'radio',
          label: 'Ultimi 30 giorni',
          value: 30,
          checked: (this.daysDateFilter === 30)
        },
        {
          name: 'days',
          type: 'radio',
          label: 'Ultimi 90 giorni',
          value: 90,
          checked: (this.daysDateFilter === 90)
        },
        {
          name: 'days',
          type: 'radio',
          label: 'Ultimo anno',
          value: 365,
          checked: (this.daysDateFilter === 365)
        },
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
            if (data) {
              this.setListDateFilter(data);
              this.refreshList();
            } else {
              return false;
            }
          }
        }
      ]
    });
  }
}
