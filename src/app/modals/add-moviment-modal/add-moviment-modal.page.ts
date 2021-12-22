import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { MovimentCategory } from '../../classes/MovimentCategory';
import { FamilyBudgetDBService } from 'src/app/services/familyBudgetDB.service';
import { MovimentTypes } from 'src/app/classes/MovimentsTypes';
import { Moviment } from 'src/app/classes/Moviment';
import { UIService } from 'src/app/services/ui.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-moviment-modal',
  templateUrl: './add-moviment-modal.page.html',
  styleUrls: ['./add-moviment-modal.page.scss'],
})
export class AddMovimentModalPage {

  public model: IMoviment = { _id: null, id_category: null, type: null, date: null, note: '', value: null, category: null };
  public movimentsTypes: Array<IMovimentType> = [];
  public movimentCategories: Array<IMovimentCategory> = [];
  public submitted = false;

  constructor(
    private appDBService: FamilyBudgetDBService,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private uiService: UIService,
    private utilityService: UtilityService
  ) { }

  async ionViewDidEnter() {
    this.movimentsTypes = MovimentTypes.getMovimentTypes();
    const ID = this.navParams.get('ID');
    let tmpModel: IMoviment = Object.assign({}, this.model);
    if (ID) { // edit
      try {
        tmpModel = await Moviment.getEntry(this.appDBService, ID);
      } catch (error) {
        this.uiService.presentAlert({
          header: 'ERRORE',
          message: 'Movimento non valido o rimosso',
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
      tmpModel.date = this.utilityService.dateToYYYYMMDD(tmpModel.date);
    } else { // new
      tmpModel.type = this.navParams.get('mvType');
      tmpModel.date = this.utilityService.dateToYYYYMMDD(new Date());
      tmpModel.value = 0;
    }
    // Carico le categorie in base al tipo di movimento che si vuole inserire/modificare
    if (tmpModel.type) {
      this.movimentCategories = await MovimentCategory.getEntries(this.appDBService, false, null, {
        entity: MovimentCategory.entityName,
        type: tmpModel.type,
        description: { $gte: '' } // workaround per ordinare per nome della categoria
      });
    }
    this.model = tmpModel;
  }

  /**
   * Metodo che effettua il submit del form
   */
  public async onSubmit() {
    this.submitted = true;
    const moviment = new Moviment(this.appDBService);
    moviment.modelToEntity(this.model);
    if (!(moviment.date instanceof Date)) {
      moviment.date = new Date(moviment.date);
    }
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
        // Faccio un +1 sul numero di movimenti della categoria
        const movimentCategory = new MovimentCategory(this.appDBService);
        if (movimentCategory.findEntry(moviment.id_category)) {
          movimentCategory.numMov += 1;
          movimentCategory.save();
        }
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
