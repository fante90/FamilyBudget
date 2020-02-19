import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMovimentModalPage } from './add-moviment-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  entryComponents: [
    AddMovimentModalPage
  ],
  declarations: [
    AddMovimentModalPage
  ]
})
export class AddMovimentModalPageModule { }
