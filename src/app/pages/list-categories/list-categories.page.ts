import { Component, OnInit } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';
import { AddCategoryModalPage } from '../modals/add-category-modal/add-category-modal.page';
import { MovimentCategory } from 'src/app/classes/MovimentCategory';
import { FamilyBudgetDBService } from 'src/app/services/familyBudgetDB.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.page.html',
  styleUrls: ['./list-categories.page.scss'],
})
export class ListCategoriesPage implements OnInit {

  public categories = [];

  constructor(private uiService: UIService, private appDBService: FamilyBudgetDBService) { }

  /**
   * Metodo utilizzato dal action button in basso a destra
   */
  public newCategory() {
    this.uiService.presentModal(AddCategoryModalPage, {});
  }

  async ngOnInit() {
    this.categories = await MovimentCategory.getEntries(this.appDBService);
  }

}
