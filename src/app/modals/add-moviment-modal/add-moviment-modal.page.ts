import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { MovimentCategory } from '../../classes/MovimentCategory';
import { FamilyBudgetDBService } from 'src/app/services/familyBudgetDB.service';
import { MovimentTypes } from 'src/app/classes/MovimentsTypes';
import { Moviment } from 'src/app/classes/Moviment';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-moviment-modal',
  templateUrl: './add-moviment-modal.page.html',
  styleUrls: ['./add-moviment-modal.page.scss'],
})
export class AddMovimentModalPage {

  public model: IMoviment = { _id: null, id_category: '', type: null, date: null, note: '', value: null, category: null };
  public movimentsTypes: Array<IMovimentType> = [];
  public movimentCategories: Array<IMovimentCategory> = [];
  public submitted = false;

  constructor(
    private appDBService: FamilyBudgetDBService,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private uiService: UIService
  ) { }

  ionViewDidEnter() {
    this.model.type = this.navParams.get('mvType');
    this.model.date = new Date();
    this.model.value = 0;
    this.movimentsTypes = MovimentTypes.getMovimentTypes();
    // Carico le categorie in base al tipo di movimento che si vuole inserire
    if (this.model.type) {
      MovimentCategory.getEntries(this.appDBService, false, null, {
        entity: MovimentCategory.entityName,
        type: this.model.type
      }).then(movCategories => this.movimentCategories = movCategories);
    }
  }

  /**
   * Metodo che effettua il submit del form
   */
  public async onSubmit() {
    this.submitted = true;
    const moviment = new Moviment(this.appDBService);
    moviment.modelToEntity(this.model);
    // Valido il record inserito
    if (!await moviment.valid()) {
      this.submitted = false;
      this.uiService.presentAlert({
        header: 'ERRORE',
        message: moviment.getErrors().join('\n\r'),
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
      const result = await moviment.save();
      if (result === false) { // Errore
        this.uiService.presentAlert({
          header: 'ERRORE',
          message: moviment.getErrors().join('\n\r'),
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
          message: (this.model._id) ? 'Movimento aggiornato correttamente' : 'Movimento inserito correttamente',
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
