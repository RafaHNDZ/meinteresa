import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';

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
    public popCtrl: PopoverController,
    private actionSheetCtrl: ActionSheetController,
    private platform: Platform
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

  chatOptions(e){
    this.popCtrl.create(SharePopMenu).present({ev:e});
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Enviar',
      buttons: [
        {
          text: 'Galería',
          icon: !this.platform.is('ios') ? 'image' : null,
          handler: () => {
            console.log('Galería clicked');
          }
        },{
          text: 'Cámara',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            console.log('Cámara clicked');
          }
        },{
          text: 'Ubicación',
          icon: !this.platform.is('ios') ? 'pin' : null,
          handler: () => {
            console.log('Ubicación clicked');
          }
        },{
          text: 'Contacto',
          icon: !this.platform.is('ios') ? 'contact' : null,
          handler: () => {
            console.log('Contacto clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  shareMenu(ev){
    let pop = this.popCtrl.create(SharePopMenu);
    pop.present({ev: ev});
  }
}
