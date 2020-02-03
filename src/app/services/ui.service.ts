import { Injectable } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  constructor(private actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController) { }

  /**
   * Metodo per visualizzare un action sheet
   * @param title Titolo dell'action sheet
   * @param buttons Comandi da mostrare nell'action sheet, il pulsante "Annulla" viene aggiunto automaticamente
   */
  public async presentActionSheet(title: string, buttons: Array<object>) {
    buttons.push({
      text: 'Annulla',
      icon: 'close',
      role: 'cancel'
    });
    const actionSheet = await this.actionSheetCtrl.create({
      header: title,
      buttons: buttons
    });
    await actionSheet.present();
  }

  /**
   * Metodo per aprire una pagina in modale
   * @param modalPage nome della classe della pagina da aprire
   * @param modalParams oggetto contenente i parametri da passare alla pagina aperta in modale
   */
  public async presentModal(modalPage: any, modalParams: { [key: string]: any; }) {
    const modal = await this.modalCtrl.create({
      component: modalPage,
      componentProps: modalParams
    });
    await modal.present();
  }
}
