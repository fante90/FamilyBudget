import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListMovimentsFiltersModalPage } from './list-moviments-filters-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  entryComponents: [
    ListMovimentsFiltersModalPage
  ],
  declarations: [
    ListMovimentsFiltersModalPage
  ]
})
export class ListMovimentsFiltersModalPageModule { }
