import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pop-optios-perfil',
  templateUrl: 'pop-optios-perfil.html',
})
export class PopOptiosPerfil {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopOptiosPerfilPage');
  }

}
