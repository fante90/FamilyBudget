import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  constructor(private actionSheetCtrl: ActionSheetController) { }

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
}
