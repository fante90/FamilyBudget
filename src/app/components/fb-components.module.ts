import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

// Elenco componenti del modulo
import { FbDateFilterToolbarComponent } from './fb-date-filter-toolbar/fb-date-filter-toolbar.component';
import { FbDateFilterToolbarPopoverComponent } from './fb-date-filter-toolbar/fb-date-filter-toolbar-popover/fb-date-filter-toolbar-popover.component';
import { FbColorPickerComponent } from './fb-color-picker/fb-color-picker.component';
import { FbIconPickerComponent } from './fb-icon-picker/fb-icon-picker.component';
import { FbHeaderComponent } from './fb-header/fb-header.component';
import { FbCategCardListComponent } from './fb-categs-card-list/fb-categs-card-list.component';
import { FbCategCardListItmComponent } from './fb-categs-card-list/fb-categs-card-list-itm/fb-categs-card-list-itm.component';
import { FbSkeletonItmMovsComponent } from './fb-skeleton-itm-movs/fb-skeleton-itm-movs.component';



@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        RouterModule
    ],
    exports: [
        FbDateFilterToolbarComponent,
        FbHeaderComponent,
        FbCategCardListComponent,
        FbSkeletonItmMovsComponent
    ],
    declarations: [
        FbDateFilterToolbarComponent, FbDateFilterToolbarPopoverComponent,
        FbColorPickerComponent,
        FbIconPickerComponent,
        FbHeaderComponent,
        FbCategCardListComponent, FbCategCardListItmComponent,
        FbSkeletonItmMovsComponent
    ],
    entryComponents: [
        FbDateFilterToolbarPopoverComponent,
        FbColorPickerComponent,
        FbIconPickerComponent,
        FbCategCardListComponent,
        FbCategCardListItmComponent
    ]
})
export class FbComponentsModule { }
