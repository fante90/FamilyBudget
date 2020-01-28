import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IndexedDBService } from './services/indexedDB.service';

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
    private indexedDBService: IndexedDBService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.indexedDBService.openDB('FamilyBudgetDB', 1).then((data) => {
        alert('Db aperto con successo!');
        if (data.updateNeeded) {
          alert('E\' necessario aggiornare il db');
        }
      }, (error) => {
        alert(error.code + ' ' + error.message);
      });
    });
  }
}
