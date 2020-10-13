import { Component } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';
import { FamilyBudgetDBService } from 'src/app/services/familyBudgetDB.service';
import { AddMovimentModalPage } from 'src/app/modals/add-moviment-modal/add-moviment-modal.page';
import { Moviment } from 'src/app/classes/Moviment';
import { ListMovimentsFiltersModalPage } from './list-moviments-filters-modal/list-moviments-filters-modal.page';
import { UtilityService } from 'src/app/services/utility.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-moviments',
  templateUrl: 'list-moviments.page.html',
  styleUrls: ['list-moviments.page.scss']
})
export class ListMovimentsPage {
  public listFilterModel = {
    fromDate: null,
    toDate: null,
    type: '*',
    category: '*'
  };
  public moviments: Array<IMoviment> = null;

  public dateFilterToolbarInitConfig = null;
  public dateFilterToolbarSaveConfig = true;

  constructor(
    private uiService: UIService,
    private appDBService: FamilyBudgetDBService,
    private utilityService: UtilityService,
    private route: ActivatedRoute) {
    // Verifico la presenza di parametri per sovrascrivere l'inizializzazione del modello di filtri
    this.route.params.subscribe(params => {
      if (params.category) { // parametro per sovrascrivere la categoria di filtro
        this.listFilterModel.category = params.category;
      }
      if (params.filterDateType) { // parametro per sovrascrivere il range di date di filtro
        let offset = 0;
        let startCustDate = null;
        let endCustDate = null;
        if (params.filterDateOffset) { // parametro per sovrascrivere l'offset del filtro
          offset = params.filterDateOffset;
        }
        if (params.filterDateStartCustDate) { // parametro per sovrascrivere la data inizio di un periodo custom
          startCustDate = params.filterDateStartCustDate;
        }
        if (params.filterDateEndCustDate) { // parametro per sovrascrivere la data fine di un periodo custom
          endCustDate = params.filterDateEndCustDate;
        }
        this.dateFilterToolbarInitConfig = { range: params.filterDateType, offset, startCustDate, endCustDate };
        this.dateFilterToolbarSaveConfig = false; // in questo caso non salvo in localStorage la configurazione passata al componente
      }
    });
  }

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
   * Metodo che inizializza/aggiorna l'elenco dei movimenti
   */
  public refreshList(event = null) {
    this.moviments = null; // Svuoto l'elenco
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

  /**
   * Metodo che restituisce la somma dei movimenti in uscita
   */
  getTotalOut() {
    let total = 0;
    if (this.moviments) {
      this.moviments.forEach(mov => {
        if (mov.type !== 'P') {
          total += mov.value * -1;
        }
      });
    }

    return total;
  }

  /**
   * Metodo che restituisce la somma dei movimenti in entrata
   */
  getTotalIn() {
    let total = 0;
    if (this.moviments) {
      this.moviments.forEach(mov => {
        if (mov.type === 'P') {
          total += mov.value;
        }
      });
    }

    return total;
  }

  /**
   * Metodo richiamato quando cambia il filtro nel componente fb-date-filter-toolbar
   * @param filterData oggetto che contiene data inizio e data fine da impostare come filtro
   */
  dateFilterChanged(filterData) {
    this.listFilterModel.fromDate = filterData.start.toISOString();
    this.listFilterModel.toDate = filterData.end.toISOString();
    this.refreshList();
  }
}
