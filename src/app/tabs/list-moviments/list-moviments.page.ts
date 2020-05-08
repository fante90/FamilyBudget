import { Component } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';
import { FamilyBudgetDBService } from 'src/app/services/familyBudgetDB.service';
import { AddMovimentModalPage } from 'src/app/modals/add-moviment-modal/add-moviment-modal.page';
import { Moviment } from 'src/app/classes/Moviment';
import { ListMovimentsFiltersModalPage } from './list-moviments-filters-modal/list-moviments-filters-modal.page';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-moviments',
  templateUrl: 'list-moviments.page.html',
  styleUrls: ['list-moviments.page.scss']
})
export class ListMovimentsPage {
  public listFilterModel = {
    // Uso toISOString() per il componente ion-date nella modale, altrimenti non mostra la data correttamente
    fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0).toISOString(), // ultimo mese
    toDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 0).toISOString(),
    type: '*',
    category: '*'
  };
  public moviments: Array<IMoviment> = [];

  constructor(
    private uiService: UIService,
    private appDBService: FamilyBudgetDBService,
    private utilityService: UtilityService) { }

  /**
   * Metodo utilizzato dal action button in basso a destra
   */
  public async newMoviment() {
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
   * Metodo utilizzato dal item option di modifica presente sulle categorie
   */
  public async editMoviment(moviment: IMoviment) {
    const modal = await this.uiService.presentModal(AddMovimentModalPage, { ID: moviment._id });
    modal.onDidDismiss().then(() => {
      this.refreshList();
    });
  }

  /**
   * Metodo utilizzato dal item option di cancellazione presente sulle categorie
   */
  public async deleteMoviment(moviment: IMoviment) {
    this.uiService.presentAlert({
      header: 'Elimina movimento',
      message: 'Sei sicuro di voler eliminare il movimento?',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'medium'
        }, {
          text: 'Conferma',
          handler: () => {
            this.delete(moviment);
          }
        }
      ]
    });
  }

  private async delete(moviment: IMoviment) {
    const mov = new Moviment(this.appDBService);
    let result: boolean = await mov.findEntry(moviment._id);
    if (result) {
      result = await mov.delete();
    }
    if (result === false) { // Errore
      this.uiService.presentAlert({
        header: 'ERRORE',
        message: mov.getErrors().join('\n\r'),
        buttons: [
          {
            text: 'Chiudi',
            role: 'cancel',
            cssClass: 'primary'
          }
        ]
      });
    } else { // Tutto ok
      this.uiService.presentToast({
        message: 'Movimento eliminato correttamente',
        duration: 2000,
        color: 'success'
      });
      this.refreshList();
    }
  }

  /**
   * Metodo che inizializza/aggiorna l'elenco delle categorie
   */
  public refreshList(event = null) {
    // creo il selector in base ai filtri impostati
    const selector = {
      entity: Moviment.entityName,
      date: {
        $gte: this.utilityService.dateToISO(this.listFilterModel.fromDate),
        $lte: this.utilityService.dateToISO(this.listFilterModel.toDate)
      }
    };
    // valuto se selzionato un tipo di movimento
    if (this.listFilterModel.type !== '*') {
      selector['type'] = this.listFilterModel.type;
    }
    // valuto se selzionata una categoria di movimento
    if (this.listFilterModel.category !== '*') {
      selector['id_category'] = this.listFilterModel.category;
    }
    Moviment.getEntries(this.appDBService, false, null, selector).then(result => {
      this.moviments = result;
      if (event) {
        event.target.complete();
      }
    });
  }

  /**
   * Metodo che apre la modale per impostare i filtri della lista
   */
  async openModalSetFilter() {
    const modal = await this.uiService.presentModal(ListMovimentsFiltersModalPage, {
      listFilterModel: this.listFilterModel
    });
    modal.onDidDismiss().then((rtn: any) => {
      if (rtn && rtn.data) {
        this.listFilterModel = rtn.data;
      }
      this.refreshList();
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

  ionViewDidEnter() {
    this.refreshList();
  }
}
