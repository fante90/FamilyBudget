import { Component } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';
import { AddCategoryModalPage } from '../../modals/add-category-modal/add-category-modal.page';
import { MovimentCategory } from 'src/app/classes/MovimentCategory';
import { MovimentTypes } from 'src/app/classes/MovimentsTypes';
import { FamilyBudgetDBService } from 'src/app/services/familyBudgetDB.service';
import { Moviment } from 'src/app/classes/Moviment';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.page.html',
  styleUrls: ['./list-categories.page.scss'],
})
export class ListCategoriesPage {

  public categories: Array<IMovimentCategory> = [];

  constructor(private uiService: UIService, private appDBService: FamilyBudgetDBService) { }

  /**
   * Metodo utilizzato dal action button in basso a destra
   */
  public async newCategory() {
    const modal = await this.uiService.presentModal(AddCategoryModalPage, {});
    modal.onDidDismiss().then(() => {
      this.refreshList();
    });
  }

  /**
   * Metodo utilizzato dal item option di modifica presente sulle categorie
   */
  public async editCategory(category: IMovimentCategory) {
    const modal = await this.uiService.presentModal(AddCategoryModalPage, { ID: category._id });
    modal.onDidDismiss().then(() => {
      this.refreshList();
    });
  }

  /**
   * Metodo utilizzato dal item option di cancellazione presente sulle categorie
   */
  public async deleteCategory(category: IMovimentCategory) {
    this.uiService.presentAlert({
      header: 'Elimina categoria',
      message: 'Sei sicuro di voler eliminare la categoria ' + category.description + '?',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'medium'
        }, {
          text: 'Conferma',
          handler: () => {
            this.delete(category);
          }
        }
      ]
    });
  }

  private async delete(category: IMovimentCategory) {
    const movCategory = new MovimentCategory(this.appDBService);
    let result: boolean = await movCategory.findEntry(category._id);
    if (result) {
      // verifico se la categoria è utilizzata
      const selector = {
        entity: Moviment.entityName,
        id_category: movCategory._id
      };
      const moviments: IMoviment[] = await Moviment.getEntries(this.appDBService, false, 1, selector);
      if (moviments && moviments.length > 0) {
        this.uiService.presentAlert({
          header: 'ERRORE',
          message: 'La categoria è collegata a dei movimenti e non può essere cancellata',
          buttons: [
            {
              text: 'Chiudi',
              role: 'cancel',
              cssClass: 'primary'
            }
          ]
        });
        return;
      }
      result = await movCategory.delete();
    }
    if (result === false) { // Errore
      this.uiService.presentAlert({
        header: 'ERRORE',
        message: movCategory.getErrors().join('\n\r'),
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
        message: 'Categoria eliminata correttamente',
        duration: 2000,
        color: 'success'
      });
      this.refreshList();
    }
  }

  /**
   * Metodo che restituisce la descrizione del tipo di movimento associato alla categoria
   * @param code Codice del tipo di movimento
   */
  public getTypeDescription(code: string): string {
    return MovimentTypes.getMovimentType(code).description;
  }

  /**
   * Metodo che inizializza/aggiorna l'elenco delle categorie
   */
  public refreshList(event = null) {
    const selector = {
      entity: MovimentCategory.entityName,
      description: { $gte: '' } // workaround per ordinare per nome della categoria
    };
    MovimentCategory.getEntries(this.appDBService, false, null, selector).then(result => {
      this.categories = result;
      if (event) {
        event.target.complete();
      }
    });
  }

  ionViewDidEnter() {
    this.refreshList();
  }

}
