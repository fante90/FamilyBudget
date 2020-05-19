import { Component, ViewChild, Renderer2 } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-fb-color-picker',
    templateUrl: './fb-color-picker.component.html',
    styleUrls: ['./fb-color-picker.component.scss'],
})

export class FbColorPickerComponent {
    @ViewChild('colorRange', { static: true }) colorSlider: any; // Riferimento all'ionRange

    constructor(private renderer2: Renderer2, private popoverCtrl: PopoverController) { }
    
    // Colori selezionabili
    colors = [
        '#333333', '#AAAAAA', '#00FF00', '#32CD32',
        '#00BFFF', '#1E90FF', '#9370DB', '#663399',
        '#FF69B4', '#FF1493', '#FFB6C1', '#C71585',
        '#FF5733', '#FF0000', '#FFA500', '#FFD700'
    ];
    selectedColor; // colore attualmente selezionato tra quelli disponibili
    rtnColor; // colore effettivamente restituito dal componente con l'eventuale sfumatura applicata con il colorRange
    // configurazione dell'ionRange
    colorRangeConfig = {
        min: -100,
        max: 100,
        value: 0,
        defaultBarBackground: '#e5e5e5'
    };

    /**
     * Metodo richiamato alla selezione del colore da parte dell'utente, attiva anche il colorRange
     * @param color colore selezionato dall'utente
     */
    setSelectedColor(color: string) {
        this.selectedColor = color;
        this.rtnColor = color;
        this.setColorRangeBackgroundGradient(color);
        this.renderer2.setAttribute(this.colorSlider.el, 'value', this.colorRangeConfig.value.toString());
    }

    /**
     * Metodo richiamato quando viene modificata la sfumatura del colore tramite il colorRange
     * @param event evento del componente ionRange
     */
    onColorRangeChange(event) {
        this.rtnColor = this.adjustColor(this.selectedColor, event, null);
    }

    /**
     * Valorizza la sfumatura da mostrare sul colorRange in base al colore ricevuto per parametro
     * @param color colore per cui creare la sfumatura sul colorRange
     */
    private setColorRangeBackgroundGradient(color) {
        if (color) {
            const darkColor = this.adjustColor(color, undefined, this.colorRangeConfig.min) + ' 0%,';
            const middleolor = color + ' 50%,';
            const lightColor = this.adjustColor(color, undefined, this.colorRangeConfig.max) + ' 100%)';
            // 'linear-gradient(100deg, rgba(92,0,0,1) 0%, rgba(192,57,43,1) 50%, rgba(255,157,143,1) 100%)'
            const linearGradient = 'linear-gradient(100deg, ' + darkColor + middleolor + lightColor;
            this.renderer2.setStyle(this.colorSlider.el.shadowRoot.children[1].children[0], 'background', linearGradient);
        } else {
            this.renderer2.setStyle(this.colorSlider.el.shadowRoot.children[1].children[0], 'background', this.colorRangeConfig.defaultBarBackground);
        }
    }

    /**
     * Metodo che in base al colore selezionato e il valore di "sfumatura" restituisce l'esadecimale del colore corrispondente
     * @param color colore di base
     * @param customEvent evento dell'ionRange che contiene il valore di sfumatura
     * @param amount valore di sfumatura passato manualmente
     */
    adjustColor(color, customEvent, amount) {
        const amt = customEvent ? customEvent.detail.value : amount;
        let usePound = false;
        if (color[0] === '#') {
            color = color.slice(1);
            usePound = true;
        }
        let R = parseInt(color.substring(0, 2), 16);
        let G = parseInt(color.substring(2, 4), 16);
        let B = parseInt(color.substring(4, 6), 16);
        // to make the colour less bright than the input
        // change the following three "+" symbols to "-"
        R = R + amt;
        G = G + amt;
        B = B + amt;
        if (R > 255) {
            R = 255;
        }
        else if (R < 0) {
            R = 0;
        }
        if (G > 255) {
            G = 255;
        }
        else if (G < 0) {
            G = 0;
        }
        if (B > 255) {
            B = 255;
        }
        else if (B < 0) {
            B = 0;
        }
        const RR = ((R.toString(16).length === 1) ? '0' + R.toString(16) : R.toString(16));
        const GG = ((G.toString(16).length === 1) ? '0' + G.toString(16) : G.toString(16));
        const BB = ((B.toString(16).length === 1) ? '0' + B.toString(16) : B.toString(16));
        return (usePound ? '#' : '') + RR + GG + BB;
    }

    // Chiude il popover
    dismiss() {
        this.popoverCtrl.dismiss();
    }

    // Chiude il popover passando il colore selezionato
    confirm() {
        if (this.rtnColor) {
            this.popoverCtrl.dismiss(this.rtnColor);
        }
    }
}
