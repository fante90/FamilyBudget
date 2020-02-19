import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { MovimentCategory } from '../../classes/MovimentCategory';

@Component({
  selector: 'app-add-moviment-modal',
  templateUrl: './add-moviment-modal.page.html',
  styleUrls: ['./add-moviment-modal.page.scss'],
})
export class AddMovimentModalPage implements OnInit {

  public movimentType: string = 'P';
  public movimentCategories: Array<MovimentCategory>;

  constructor(private modalCtrl: ModalController, private navParams: NavParams) {
    this.movimentType = this.navParams.get('mvType');
  }

  ngOnInit() {
    // Simulazione di categorie da caricare da db in base al tipo di movimento
    switch (this.movimentType) {
      case 'P':
        this.movimentCategories = [
          new MovimentCategory(7, 'Prestito', 'P', 'light', 'swap'),
          new MovimentCategory(8, 'Regalo', 'P', 'light', 'bowtie'),
          new MovimentCategory(9, 'Stipendio', 'P', 'light', 'briefcase'),
        ];
        break;
      case 'M':
        this.movimentCategories = [
          new MovimentCategory(1, 'Bollette Gas', 'M', 'dark', 'thermometer'),
          new MovimentCategory(2, 'Bollette Luce', 'M', 'dark', 'flash'),
          new MovimentCategory(3, 'Bollette Telefoniche', 'M', 'dark', 'globe'),
          new MovimentCategory(4, 'Cene', 'M', 'secondary', 'pizza'),
          new MovimentCategory(5, 'Shopping', 'M', 'tertiary', 'shirt'),
          new MovimentCategory(6, 'Spesa', 'M', 'primary', 'basket')
        ];
        break;
      case 'I':
        this.movimentCategories = [
          new MovimentCategory(7, 'Fondo pensione', 'I', 'medium', 'paper'),
          new MovimentCategory(8, 'Piano di accumulo', 'I', 'medium', 'trending-up'),
        ];
        break;
      default:
        this.movimentCategories = [];
        break;
    }
  }

  /**
   * Metodo per chiudere la modale con cui è stata aperta la pagina
   */
  public dismissModal() {
    this.modalCtrl.dismiss();
  }
}
