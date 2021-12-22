import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMovimentModalPage } from './add-moviment-modal.page';
import { FbComponentsModule } from 'src/app/components/fb-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FbComponentsModule
  ],
  entryComponents: [
    AddMovimentModalPage
  ],
  declarations: [
    AddMovimentModalPage
  ]
})
export class AddMovimentModalPageModule { }
