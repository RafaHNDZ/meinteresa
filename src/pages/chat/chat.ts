import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PopoverController } from 'ionic-angular';

import { SharePopMenu } from '../popMenu/share-pop-menu/share-pop-menu';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  tabsMenu: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popCtrl: PopoverController
  ) {
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

  shareMenu(ev){
    let pop = this.popCtrl.create(SharePopMenu);
    pop.present({ev: ev});
  }
}
