import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  tabsMenu: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabsMenu = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  ionViewWillEnter(){
    console.log("Apunto de entrar");
    this.tabsMenu.style.display = 'none';
  }

  ionViewWillLeave(){
    console.log("Apunto de salir");
    this.tabsMenu.style.display = 'flex';
  }
}
