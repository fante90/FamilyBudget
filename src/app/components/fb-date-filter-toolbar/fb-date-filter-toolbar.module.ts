import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FbDateFilterToolbarComponent } from './fb-date-filter-toolbar.component';
import { FbDateFilterToolbarPopoverComponent } from './fb-date-filter-toolbar-popover/fb-date-filter-toolbar-popover.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [FbDateFilterToolbarComponent],
  declarations: [FbDateFilterToolbarComponent, FbDateFilterToolbarPopoverComponent],
  entryComponents: [FbDateFilterToolbarPopoverComponent]
})
export class FbDateFilterToolbarModule { }
