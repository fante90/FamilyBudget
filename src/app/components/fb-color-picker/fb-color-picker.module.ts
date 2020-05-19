import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { FbColorPickerComponent } from './fb-color-picker.component';



const routes: Routes = [
  {
    path: '',
    component: FbColorPickerComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FbColorPickerComponent]
})
export class FbColorPickerModule {}
