import { Component } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';
import { AddCategoryModalPage } from '../../modals/add-category-modal/add-category-modal.page';
import { MovimentCategory } from 'src/app/classes/MovimentCategory';
import { FamilyBudgetDBService } from 'src/app/services/familyBudgetDB.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.page.html',
  styleUrls: ['./list-categories.page.scss'],
})
export class ListCategoriesPage {

  public categories: Array<any> = [];

  constructor(private uiService: UIService, private appDBService: FamilyBudgetDBService) { }

  /**
   * Metodo utilizzato dal action button in basso a destra
   */
  public async newCategory() {
    const modal = await this.uiService.presentModal(AddCategoryModalPage, {});
    modal.onDidDismiss().then(() => {
      this.refreshCategories();
    });
  }

  /**
   * Metodo che inizializza/aggiorna l'elenco delle categorie
   */
  private refreshCategories() {
    MovimentCategory.getEntries(this.appDBService).then(result => {
      this.categories = result;
    });
  }

  ionViewDidEnter() {
    this.refreshCategories();
  }

}
