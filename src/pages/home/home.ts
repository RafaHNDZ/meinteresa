import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FavoritosPage, BuscarPage, MensajesPage, PublicarPage, PerfilPage } from '../index.pages'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tabBarElement: any;
  splash: boolean;

  tabFavoritos = FavoritosPage;
  tabBuscar = BuscarPage;
  tabMensajes = MensajesPage;
  tabPublicar = PublicarPage;
  tabPerfil = PerfilPage;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    //this.tabBarElement = document.querySelector('.tabbar');
    this.tabBarElement = document.getElementById('tab-menu');
    //this.tabBarElement.style.display = 'none';
    if(navParams.get('showSplash') != false){
      this.splash = true;
    }
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.splash = false;
      //this.tabBarElement.style.display = 'flex';
    }, 4000);
  }
}
