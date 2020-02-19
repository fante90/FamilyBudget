import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FamilyBudgetDBService } from './services/familyBudgetDB.service';
import { UIService } from './services/ui.service';

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
    private uiService: UIService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      try {
        await this.familyBudgetDBService.openDB();
      } catch (error) {
        this.uiService.presentAlert({
          message: error,
          backdropDismiss: false
        });
      }
    });
  }
}
