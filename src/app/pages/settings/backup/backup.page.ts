import { Component } from '@angular/core';
import { FamilyBudgetDBService } from 'src/app/services/familyBudgetDB.service';
import { UIService } from 'src/app/services/ui.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.page.html',
  styleUrls: ['./backup.page.scss'],
})
export class BackupPage {

  constructor(private appDBService: FamilyBudgetDBService, private uiService: UIService, private utilityService: UtilityService) { }

  async doBackup() {
    const loadingAlert = await this.uiService.presentAlert({ message: 'Backup in corso...' });
    // Effettuo il backup dei soli documenti relativi alle entities
    this.appDBService.backup(true).then(backupStr => {
      this.utilityService.download(
        backupStr,
        'FamilyBudget.db.bak',
        'text/plain');
      loadingAlert.dismiss();
    }).catch(error => {
      loadingAlert.dismiss();
      this.uiService.presentAlert({
        header: 'ERRORE',
        message: error,
        buttons: [
          {
            text: 'Chiudi',
            role: 'cancel',
            cssClass: 'primary'
          }
        ]
      });
    });
  }

  restoreBackup() {
    document.getElementById('restoreBackupFile').click();
  }

  confRestoreBackup(event) {
    const file = event.target.files[0];
    if (file) {
      this.uiService.presentAlert({
        header: 'Ripristino Backup',
        message: 'Sei sicuro di voler procedere? L\'attuale db verrà sovrascritto',
        buttons: [
          {
            text: 'Annulla',
            role: 'cancel',
            cssClass: 'medium'
          }, {
            text: 'Conferma',
            handler: () => {
              this.completeRestoreBackup(file);
            }
          }
        ]
      });
    }
  }

  async completeRestoreBackup(file) {
    if (file) {
      const loadingAlert = await this.uiService.presentAlert({ message: 'Ripristino backup in corso...' });
      const reader = new FileReader();
      reader.onload = (res: any) => {
        this.appDBService.restoreBackup(res.target.result).then(() => {
          loadingAlert.dismiss();
          this.uiService.presentToast({
            message: 'Backup ripristinato con successo',
            duration: 2000,
            color: 'success'
          });
        }).catch(error => {
          loadingAlert.dismiss();
          this.uiService.presentAlert({
            header: 'ERRORE',
            message: error,
            buttons: [
              {
                text: 'Chiudi',
                role: 'cancel',
                cssClass: 'primary'
              }
            ]
          });
        });
      };
      reader.readAsText(file);
    }
  }

}
