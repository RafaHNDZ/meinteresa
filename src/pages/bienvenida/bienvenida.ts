import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage, RegistroPage } from '../index.pages';

@IonicPage()
@Component({
  selector: 'page-bienvenida',
  templateUrl: 'bienvenida.html',
})
export class BienvenidaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BienvenidaPage');
  }

  ingresar(){
    this.navCtrl.push(LoginPage);
  }

  registrarse(){
    this.navCtrl.push(RegistroPage);
  }

}
