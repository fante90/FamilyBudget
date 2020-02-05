import { Component, OnInit } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';
import { AddCategoryModalPage } from '../modals/add-category-modal/add-category-modal.page';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.page.html',
  styleUrls: ['./list-categories.page.scss'],
})
export class ListCategoriesPage implements OnInit {

  constructor(private uiService: UIService) { }

  /**
   * Metodo utilizzato dal action button in basso a destra
   */
  public newCategory() {
    this.uiService.presentModal(AddCategoryModalPage, {});
  }

  ngOnInit() {
  }

}
