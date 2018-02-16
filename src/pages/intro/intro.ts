import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BienvenidaPage } from '../bienvenida/bienvenida';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  splash = true;
  skipMsg: string = "Saltar";
  @ViewChild(Slides) slides: Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private platform: Platform
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
    setTimeout(()=> this.splash = false, 4000);
  }

  slideChanged() {
    if (this.slides.isEnd())
      this.skipMsg = "Deacuerdo, Continuar";
  }

  next(){
    if(this.platform.is('cordova')){
      this.storage.set('saltar_intro', true).then(() => {
        this.navCtrl.push(BienvenidaPage);
      }).catch(() => {
        console.log("Storage Error!");
      });
    }else{
      localStorage.setItem('saltar_intro', 'true');
      this.navCtrl.push(BienvenidaPage);
    }
  }

}
