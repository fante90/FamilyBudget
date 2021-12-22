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
import { FbChooseCatFieldComponent } from './fb-choose-cat-field/fb-choose-cat-field.component';
import { FbCategsListComponent } from './fb-categs-list/fb-categs-list.component';



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
        FbSkeletonItmMovsComponent,
        FbChooseCatFieldComponent
    ],
    declarations: [
        FbDateFilterToolbarComponent, FbDateFilterToolbarPopoverComponent,
        FbColorPickerComponent,
        FbIconPickerComponent,
        FbHeaderComponent,
        FbCategCardListComponent, FbCategCardListItmComponent,
        FbSkeletonItmMovsComponent,
        FbChooseCatFieldComponent,
        FbCategsListComponent
    ],
    entryComponents: [
        FbDateFilterToolbarPopoverComponent,
        FbColorPickerComponent,
        FbIconPickerComponent,
        FbCategCardListComponent,
        FbCategCardListItmComponent,
        FbCategsListComponent
    ]
})
export class FbComponentsModule { }
