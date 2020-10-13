import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListMovimentsPage } from './list-moviments.page';
import { FbComponentsModule } from 'src/app/components/fb-components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ListMovimentsPage }]),
    FbComponentsModule
  ],
  declarations: [ListMovimentsPage]
})
export class ListMovimentPageModule { }
