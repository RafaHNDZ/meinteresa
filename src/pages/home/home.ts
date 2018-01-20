import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FavoritosPage, BuscarPage, MensajesPage, PublicarPage, PerfilPage } from '../index.pages'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tabFavoritos = FavoritosPage;
  tabBuscar = BuscarPage;
  tabMensajes = MensajesPage;
  tabPublicar = PublicarPage;
  tabPerfil = PerfilPage;

  constructor(public navCtrl: NavController) {

  }

}
