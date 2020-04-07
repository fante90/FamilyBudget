import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { MovimentCategory } from 'src/app/classes/MovimentCategory';
import { MovimentTypes } from 'src/app/classes/MovimentsTypes';
import { UIService } from 'src/app/services/ui.service';
import { FamilyBudgetDBService } from 'src/app/services/familyBudgetDB.service';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.page.html',
  styleUrls: ['./add-category-modal.page.scss'],
})
export class AddCategoryModalPage {

  public model: IMovimentCategory = { _id: null, description: '', type: '', color: '', icon: '' };
  public movimentsTypes: Array<IMovimentType> = [];
  public colors = [];
  public submitted = false;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private uiService: UIService,
    private appDBService: FamilyBudgetDBService
  ) { }

  async ionViewDidEnter() {
    const ID = this.navParams.get('ID');
    this.movimentsTypes = MovimentTypes.getMovimentTypes();
    this.colors = MovimentCategory.getColors();
    // Se è arrivato un ID sono in edit, devo fare la retrieve del record da db
    if (ID) {
      try {
        this.model = await MovimentCategory.getEntry(this.appDBService, ID);
      } catch (error) {
        this.uiService.presentAlert({
          header: 'ERRORE',
          message: 'Categoria non valida o rimossa',
          buttons: [
            {
              text: 'Chiudi',
              role: 'cancel',
              cssClass: 'primary'
            }
          ]
        });
        this.modalCtrl.dismiss();
      }
    }
  }

  /**
   * Metodo che effettua il submit del form
   */
  public async onSubmit() {
    this.submitted = true;
    const movimentCategory = new MovimentCategory(this.appDBService);
    movimentCategory.modelToEntity(this.model);
    // Valido il record inserito
    if (!await movimentCategory.valid()) {
      this.submitted = false;
      this.uiService.presentAlert({
        header: 'ERRORE',
        message: movimentCategory.getErrors().join('\n\r'),
        buttons: [
          {
            text: 'Annulla e correggi',
            role: 'cancel',
            cssClass: 'primary'
          }
        ]
      });
    } else {
      // Effettuo il salvataggio su db
      const result = await movimentCategory.save();
      if (result === false) { // Errore
        this.uiService.presentAlert({
          header: 'ERRORE',
          message: movimentCategory.getErrors().join('\n\r'),
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
          message: (this.model._id) ? 'Categoria aggiornata correttamente' : 'Categoria inserita correttamente',
          duration: 2000,
          color: 'success'
        });
        this.modalCtrl.dismiss();
      }
      this.submitted = false;
    }
  }

  /**
   * Metodo per chiudere la modale con cui è stata aperta la pagina
   */
  public dismissModal() {
    this.modalCtrl.dismiss();
  }

}
