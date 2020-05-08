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
import { FbHeaderComponent } from './components/fb-header/fb-header.component';

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
    ListMovimentsFiltersModalPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
