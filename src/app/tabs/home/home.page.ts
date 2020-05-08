import { Component } from '@angular/core';
import { Moviment } from '../../classes/Moviment';
import { UIService } from '../../services/ui.service';
import { AddMovimentModalPage } from '../../modals/add-moviment-modal/add-moviment-modal.page';
import { FamilyBudgetDBService } from 'src/app/services/familyBudgetDB.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  public moviments: Array<IMoviment>;
  private listDateFilter: any = null;
  private daysDateFilter = 7;
  public yearlyBalance = '';

  constructor(
    private appDBService: FamilyBudgetDBService,
    private uiService: UIService) {
    // Imposto come filtro di date per la lista gli ultimi 30 giorni
    this.setListDateFilter(7);
  }

  ionViewDidEnter() {
    this.refreshList();
    this.calcYearlyBalance();
  }

  public setListDateFilter(days: number) {
    this.daysDateFilter = days;
    const endDateF = new Date();
    const tmpMilliseconds = endDateF.getTime();
    const startDateF = new Date(tmpMilliseconds - (1000 * 60 * 60 * 24 * days));
    this.listDateFilter = {
      entity: Moviment.entityName,
      date: {
        $gte: startDateF,
        $lte: endDateF
      }
    };
  }

  /**
   * Metodo utilizzato dal action button in basso a destra
   */
  public newOperation() {
    this.uiService.presentActionSheet({
      header: 'Seleziona il tipo di movimento:',
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
    this.yearlyBalance = '';
    const selector = {
      entity: Moviment.entityName,
      date: {
        $gte: new Date(new Date().getFullYear(), 0, 1, 0, 0), // 1 gennaio anno corrente
        $lte: new Date() // ora + un minuto per essere certo di prendere tutti i movimenti
      }
    };
    Moviment.getEntries(this.appDBService, false, null, selector).then(result => {
      let sum = 0;
      result.forEach(moviment => {
        sum += (moviment.value * ((moviment.type === 'P') ? 1 : -1));
      });
      this.yearlyBalance = ((sum >= 0) ? '+' : '-') + sum.toFixed(2);
    });
  }

  /**
   * Metodo che restituisce la somma dei movimenti
   */
  getTotal() {
    let total = 0;
    if (this.moviments) {
      this.moviments.forEach(mov => {
        total += (mov.value * (mov.type === 'P' ? 1 : -1));
      });
    }

    return total;
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
          label: 'Ultimi 7 giorni',
          value: 7,
          checked: (this.daysDateFilter === 7)
        },
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
