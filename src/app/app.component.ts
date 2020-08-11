import { ApplicationRef, Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FamilyBudgetDBService } from './services/familyBudgetDB.service';
import { UIService } from './services/ui.service';
import { SwUpdate } from '@angular/service-worker';
import { interval, concat } from 'rxjs';
import { first } from 'rxjs/operators';
import { UpdateDBService } from './services/updateDB.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private familyBudgetDBService: FamilyBudgetDBService,
    private uiService: UIService,
    private updateDBService: UpdateDBService,
    private swUpdate: SwUpdate,
    private applicationRef: ApplicationRef
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      try {
        await this.familyBudgetDBService.openDB();
        this.updateDBService.checkUpdate();
      } catch (error) {
        this.uiService.presentAlert({
          message: error,
          backdropDismiss: false
        });
      }

      // Registro l'evento che notifica un nuovo aggiornamento della pwa tramite il service worker
      this.swUpdate.available.subscribe(event => {
        this.uiService.presentToast({
          message: 'E\' disponibile una nuova versione dell\'app',
          position: 'bottom',
          color: 'tertiary',
          buttons: [
            {
              text: 'AGGIORNA',
              handler: () => {
                document.location.reload(); // Ricarica la pagina
              }
            },
            {
              icon: 'close-outline',
              role: 'cancel'
            }
          ]
        }).then(toast => {
          toast.present();
        });
      });
      this.checkAppUpdates();
    });
  }

  // Metodo che verifica ogni 2 ore se presente un nuovo aggiornamento della pwa
  // https://angular.io/guide/service-worker-communications#checking-for-updates
  private checkAppUpdates() {
    const appIsStable$ = this.applicationRef.isStable.pipe(first(isStable => isStable === true));
    const everyTwoHours$ = interval(2 * 60 * 60 * 1000);
    const everyTwoHoursOnceAppIsStable$ = concat(appIsStable$, everyTwoHours$);
    everyTwoHoursOnceAppIsStable$.subscribe(() => { if (this.swUpdate.isEnabled) { this.swUpdate.checkForUpdate(); } });
  }
}
