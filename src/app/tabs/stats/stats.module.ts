import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatsPage } from './stats.page';
import { FbDateFilterToolbarModule } from 'src/app/components/fb-date-filter-toolbar/fb-date-filter-toolbar.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: StatsPage }]),
    FbDateFilterToolbarModule
  ],
  declarations: [StatsPage]
})
export class StatsPageModule { }
