import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PopoverController } from 'ionic-angular'; // Controlador para los Pops

import { PopOptiosPerfil } from '../popMenu/pop-optios-perfil/pop-optios-perfil'; //La pagina de contenido del Pop

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popCtrl: PopoverController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  onModelChange(event){
    console.log(event);
  }

  openPop(event){
      let popMenu = this.popCtrl.create(PopOptiosPerfil);
      popMenu.present({ev:event});
  }

}
