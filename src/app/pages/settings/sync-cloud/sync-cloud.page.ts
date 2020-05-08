import { Component } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';
import { FamilyBudgetDBService } from 'src/app/services/familyBudgetDB.service';

@Component({
  selector: 'app-info',
  templateUrl: './sync-cloud.page.html',
  styleUrls: ['./sync-cloud.page.scss'],
})
export class SyncCloudPage {
  public activeSync = false;
  public remoteDbUrl = '';
  public initialState = false;

  constructor(private uiService: UIService, private appDBService: FamilyBudgetDBService) { }

  async ionViewDidEnter() {
    try {
      const remoteDbDoc = await this.appDBService.getEntry('remoteDb:000001');
      this.remoteDbUrl = remoteDbDoc.remoteDbUrl;
    } catch (error) {
      this.remoteDbUrl = '';
    }

    if (this.remoteDbUrl) {
      this.activeSync = true;
      this.initialState = true;
    }
  }

  showConfirm() {
    return (this.activeSync !== this.initialState);
  }

  confirmSyncChange() {
    if (!this.activeSync) {
      this.appDBService.deleteEntry('remoteDb:000001').then(() => {
        this.remoteDbUrl = '';
        this.initialState = this.activeSync;
      });
    } else {
      if (this.remoteDbUrl && (this.remoteDbUrl.indexOf('http://') === 0 || this.remoteDbUrl.indexOf('https://') === 0)) {
        this.initialState = this.activeSync;
        this.appDBService.insertEntry('remoteDb', { remoteDbUrl: this.remoteDbUrl }).then(() => {
          this.uiService.presentAlert({
            header: 'Sincronizzazione attivata',
            message: 'Se l\'url del db remoto è valida i tuoi dati verranno sincronizzati in automatico',
            buttons: [
              {
                text: 'Chiudi',
                role: 'cancel',
                cssClass: 'primary'
              }
            ]
          });
        });
      } else {
        this.uiService.presentAlert({
          header: 'ERRORE',
          message: 'Inserire un url valida',
          buttons: [
            {
              text: 'Chiudi',
              role: 'cancel',
              cssClass: 'primary'
            }
          ]
        });
      }
    }
  }
}
