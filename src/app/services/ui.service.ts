import { Injectable } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) { }


  /**
   * Metodo per visualizzare un action sheet
   * @param actionSheetParams Configurazione dell'action sheet
   */
  public async presentActionSheet(actionSheetParams) {
    const closeBtn = {
      text: 'Annulla',
      icon: 'close',
      role: 'cancel'
    };
    (actionSheetParams.buttons) ? actionSheetParams.buttons.push(closeBtn) : actionSheetParams.buttons = [closeBtn];
    const actionSheet = await this.actionSheetCtrl.create(actionSheetParams);
    await actionSheet.present();

    return actionSheet;
  }

  /**
   * Metodo per visualizzare un Alert
   * @param alertCnf Configurazione dell'alert
   */
  public async presentAlert(alertParams: object) {
    const alert = await this.alertCtrl.create(alertParams);
    await alert.present();

    return alert;
  }

  /**
   * Metodo per visualizzare un TOast
   * @param toastParams Configurazione del toast
   */
  public async presentToast(toastParams: object) {
    const toast = await this.toastCtrl.create(toastParams);
    await toast.present();

    return toast;
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

    return modal;
  }
}
