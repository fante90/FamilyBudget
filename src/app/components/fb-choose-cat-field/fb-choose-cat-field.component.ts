import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FbCategsListComponent } from '../fb-categs-list/fb-categs-list.component';

@Component({
    selector: 'fb-choose-cat-field',
    templateUrl: './fb-choose-cat-field.component.html',
    styleUrls: ['./fb-choose-cat-field.component.scss'],
})

export class FbChooseCatFieldComponent {
    @Input() required = false;
    @Input() type = null;

    constructor(
        private modalCtrl: ModalController
    ) { }

    async onClick() {
        const modal = await this.modalCtrl.create({
            component: FbCategsListComponent,
            componentProps: { type: this.type }
        });
        modal.present();
    }
}
