import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AddMovimentModalPageModule } from './modals/add-moviment-modal/add-moviment-modal.module';
import { AddCategoryModalPageModule } from './modals/add-category-modal/add-category-modal.module';
import { ListMovimentsFiltersModalPageModule } from './tabs/list-moviments/list-moviments-filters-modal/list-moviments-filters-modal.module';
import { FbColorPickerModule } from './components/fb-color-picker/fb-color-picker.module';
import { FbIconPickerModule } from './components/fb-icon-picker/fb-icon-picker.module';
import { FbHeaderComponent } from './components/fb-header/fb-header.component';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';


@NgModule({
  declarations: [AppComponent, FbHeaderComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    // Per ottenere tutte le funzionalità necessarie per i form template-driven
    FormsModule,
    // Per aprire le modali tramite un service devo includere i moduli delle pagine modali qui
    AddMovimentModalPageModule,
    AddCategoryModalPageModule,
    ListMovimentsFiltersModalPageModule,
    FbColorPickerModule,
    FbIconPickerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DatePicker
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
