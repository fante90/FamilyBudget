import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TimeoutError } from 'rxjs';
import { MovimentTypes } from 'src/app/classes/MovimentsTypes';
import { MovimentCategory } from 'src/app/classes/MovimentCategory';
import { FamilyBudgetDBService } from 'src/app/services/familyBudgetDB.service';

@Component({
  selector: 'list-moviments-filters-modal',
  templateUrl: './list-moviments-filters-modal.page.html',
})
export class ListMovimentsFiltersModalPage {
  public model = { fromDate: null, toDate: null, type: null, category: null };
  public movimentTypes: Array<any> = [];
  public movimentCategories: Array<any> = [];
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private appDBService: FamilyBudgetDBService
  ) { }

  async ionViewDidEnter() {
    this.movimentTypes = MovimentTypes.getMovimentTypes();
    this.movimentTypes.unshift({ code: '*', description: 'Tutti' });
    const tmpModel = this.navParams.get('listFilterModel');
    this.getCategories(tmpModel.type).then(() => {
      this.model = tmpModel;
    });
  }

  /**
   * Metodo richiamato al cambiare del tipo di movimento
   */
  public async changeMovType(movType) {
    this.model.category = '*';
    this.getCategories(movType);
  }

  /**
   * Metodo che popola l'elenco delle categorie in base al tipo di movimento selezionato
   */
  private async getCategories(movType) {
    let selector = null;
    if (movType !== '*') {
      selector = {
        entity: MovimentCategory.entityName,
        type: movType
      };
    }
    this.movimentCategories = await MovimentCategory.getEntries(this.appDBService, false, null, selector);
    this.movimentCategories.unshift({ _id: '*', description: 'Tutte' });
    return MovimentCategory.getEntries(this.appDBService, false, null, selector);
  }

  /**
   * Metodo per chiudere la modale con cui è stata aperta la pagina
   */
  public dismissModal() {
    this.modalCtrl.dismiss(this.model);
  }
}
