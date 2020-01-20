import { Component, OnInit } from '@angular/core';
import { Moviment } from '../../classes/Moviment';
import { UIService } from '../../services/ui.service';
import { ModalController } from '@ionic/angular';
import { AddMovimentModalPage } from '../modals/add-moviment-modal/add-moviment-modal.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {

  public moviments: Array<Moviment>;

  constructor(private uiService: UIService, private modalCtrl: ModalController) { }

  /**
   * Metodo utilizzato dal action button in basso a destra
   */
  public newOperation() {
    this.uiService.presentActionSheet('Seleziona il tipo di operazione:', [
      {
        text: 'Registra entrata',
        icon: 'arrow-round-down',
        handler: () => {
          this.presentModal(AddMovimentModalPage, {});
        }
      }, {
        text: 'Registra uscita',
        icon: 'arrow-round-up',
        handler: () => {
          console.log('Registra uscita clicked');
        }
      }, {
        text: 'Registra investimento',
        icon: 'cash',
        handler: () => {
          console.log('Registra investimento clicked');
        }
      }
    ]);
  }

  /**
   * Metodo per aprire una pagina in modale
   * @param modalPage nome della classe della pagina da aprire
   * @param modalParams oggetto contenente i parametri da passare alla pagina aperta in modale
   */
  private async presentModal(modalPage: any, modalParams: { [key: string]: any; }) {
    const modal = await this.modalCtrl.create({
      component: modalPage,
      componentProps: modalParams
    });
    await modal.present();
  }

  ngOnInit() {
    // Simulazione di movimenti da caricare da db
    this.moviments = [
      new Moviment('primary', 'basket', new Date(), 'Spesa al Mercatò', -20.19),
      new Moviment('secondary', 'pizza', new Date(), 'Cena', -35.00),
      new Moviment('dark', 'flash', new Date(), 'Bolletta luce', -105.00),
      new Moviment('dark', 'thermometer', new Date(), 'Bolletta gas', -65.00),
      new Moviment('primary', 'basket', new Date(), 'Spesa Macelleria', -45.00),
      new Moviment('tertiary', 'shirt', new Date(), 'Felpa', -45.00),
      new Moviment('dark', 'globe', new Date(), 'Connessione internet', -57.00),
    ];
  }
}
