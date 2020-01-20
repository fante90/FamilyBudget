import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-add-moviment-modal',
  templateUrl: './add-moviment-modal.page.html',
  styleUrls: ['./add-moviment-modal.page.scss'],
})
export class AddMovimentModalPage implements OnInit {

  constructor(private modalCtrl: ModalController, private navParams: NavParams) { }

  ngOnInit() {
  }

  /**
   * Metodo per chiudere la modale con cui è stata aperta la pagina
   */
  public dismissModal() {
    this.modalCtrl.dismiss();
  }
}
