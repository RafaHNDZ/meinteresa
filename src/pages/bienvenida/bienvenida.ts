import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { LoginPage, RegistroPage } from '../index.pages';

@IonicPage()
@Component({
  selector: 'page-bienvenida',
  templateUrl: 'bienvenida.html',
})
export class BienvenidaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BienvenidaPage');
  }

  ingresar(){
    this.modalCtrl.create(LoginPage).present();
  }

  registrarse(){
    this.modalCtrl.create(RegistroPage).present();
  }

}
