import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ionicIcons } from './icons.json';

@Component({
    selector: 'fb-icon-picker',
    templateUrl: './fb-icon-picker.component.html',
    styleUrls: ['./fb-icon-picker.component.scss'],
})

export class FbIconPickerComponent {
    selectedIcon;
    icons: Array<string> = ionicIcons;

    constructor(private popoverCtrl: PopoverController) {}

    /**
     * Metodo richiamato alla selezione dell'icona da parte dell'utente
     * @param icon icona selezionata dall'utente
     */
    setSelectedIcon(icon: string) {
        this.selectedIcon = icon;
    }

    // Chiude il popover
    dismiss() {
        this.popoverCtrl.dismiss();
    }

    // Chiude il popover passando l'icona selezionata
    confirm() {
        if (this.selectedIcon) {
            this.popoverCtrl.dismiss(this.selectedIcon);
        }
    }
}