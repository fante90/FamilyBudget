import { Component } from '@angular/core';
import { FamilyBudgetDBService } from 'src/app/services/familyBudgetDB.service';

@Component({
  selector: 'app-fb-header',
  templateUrl: './fb-header.component.html',
  styleUrls: ['./fb-header.component.scss'],
})
export class FbHeaderComponent {
  syncStatus = 'no-sync';
  private prevSyncStatus = '';
  constructor(private appDBService: FamilyBudgetDBService) {
    this.remoteSync();
  }

  private async remoteSync() {
    const syncRetryTime = 1000 * 30; // 30 secondi
    const syncObserver = this.appDBService.sync();
    if (syncObserver) {
      const subscription = syncObserver.subscribe((msg) => {
        if (msg.state === 'error') {
          this.syncStatus = 'sync-error';
          subscription.unsubscribe();
          setTimeout(() => {
            this.remoteSync();
          }, syncRetryTime);
        } else {
          if (msg.state === 'paused') {
            // se lo stato precedente era active o change o è appena stata attivata la sincronizzazione e i db sono allineati
            // mostro icona di stato sync attivo
            if (this.prevSyncStatus === 'active' || this.prevSyncStatus === 'change' || this.prevSyncStatus === 'first-paused' || this.prevSyncStatus === '') {
              this.syncStatus = 'sync-ok';
            } else {
              // in caso venga scatenato lo stato paused in qualsiasi altro caso è da considerare che si è offline
              this.syncStatus = 'sync-error';
            }
          }
          if (msg.state === 'active') {
            this.syncStatus = 'syncing';
          }
          // in caso di db già sincronizzato viene lanciato lo stato paused due volte,
          // per non mostrare erroneamente poi che si è offline sfrutto uno stato provvisorio
          this.prevSyncStatus = (msg.state === 'paused' && this.prevSyncStatus === '') ? 'first-paused' : msg.state;
        }
      }, (error) => {
        // il db remoto non è configurato o si è verificata un'eccezione
        this.syncStatus = 'no-sync';
        subscription.unsubscribe();
        setTimeout(() => {
          this.remoteSync();
        }, syncRetryTime);
      });
    } else {
      setTimeout(() => {
        this.remoteSync();
      }, syncRetryTime);
    }
  }
}
