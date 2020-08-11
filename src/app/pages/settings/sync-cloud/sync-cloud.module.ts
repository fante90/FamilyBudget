import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';


import { SyncCloudPage } from './sync-cloud.page';

const routes: Routes = [
  {
    path: '',
    component: SyncCloudPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SyncCloudPage]
})
export class SyncCloudPageModule {}
