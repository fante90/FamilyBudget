import { Component, OnInit } from '@angular/core';
import { Moviment } from '../../classes/Moviment';
import { UIService } from '../../services/ui.service';
import { ModalController } from '@ionic/angular';
import { AddMovimentModalPage } from '../modals/add-moviment-modal/add-moviment-modal.page';
import { MovimentCategory } from 'src/app/classes/MovimentCategory';

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
          this.uiService.presentModal(AddMovimentModalPage, { mvType: 'P' });
        }
      }, {
        text: 'Registra uscita',
        icon: 'arrow-round-up',
        handler: () => {
          this.uiService.presentModal(AddMovimentModalPage, { mvType: 'M' });
        }
      }, {
        text: 'Registra investimento',
        icon: 'cash',
        handler: () => {
          this.uiService.presentModal(AddMovimentModalPage, { mvType: 'I' });
        }
      }
    ]);
  }


  ngOnInit() {
    // Simulazione di movimenti da caricare da db
    this.moviments = [
      new Moviment(new MovimentCategory(6, 'Spesa', 'M', 'primary', 'basket'), new Date(), 'Spesa al Mercatò', -20.19),
      new Moviment(new MovimentCategory(4, 'Cene', 'M', 'secondary', 'pizza'), new Date(), 'Cena in pizzeria', -35.00),
      new Moviment(new MovimentCategory(2, 'Bollette Luce', 'M', 'dark', 'flash'), new Date(), '', -105.00),
      new Moviment(new MovimentCategory(1, 'Bollette Gas', 'M', 'dark', 'thermometer'), new Date(), '', -65.00),
      new Moviment(new MovimentCategory(6, 'Spesa', 'M', 'primary', 'basket'), new Date(), 'Spesa Macelleria', -45.00),
      new Moviment(new MovimentCategory(5, 'Shopping', 'M', 'tertiary', 'shirt'), new Date(), 'Felpa', -45.00),
      new Moviment(new MovimentCategory(3, 'Bollette Telefoniche', 'M', 'dark', 'globe'), new Date(), '', -57.00),
    ];
  }
}
