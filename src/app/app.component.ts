import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { BienvenidaPage } from '../pages/bienvenida/bienvenida';
import { IntroPage } from '../pages/intro/intro';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(
    private platform: Platform,
    statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private storage: Storage
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      storage.ready().then(() => {
        this.initApp().then(() => {
          statusBar.styleDefault();
          setTimeout(()=>{
            splashScreen.hide();
          }, 3500);
          console.log("Storage loaded!");
        });
      }).catch(() => {
        console.log("Native Storage Error!");
      });
    });
  }

  ngAfterContentInit(){
    console.log('App View Loaded!');
  }

  initApp(){
    let promesa = new Promise((resolve, reject) => {
      if(this.platform.is('cordova')){
        this.storage.get('saltar_intro').then((val) => {
          if(val){
            this.rootPage = BienvenidaPage;
          }else{
            this.rootPage = IntroPage;
          }
          resolve();
        });
      }else{
        if(localStorage.getItem('saltar_intro')){
          this.rootPage = BienvenidaPage;
        }else{
          this.rootPage = IntroPage;
        }
        resolve();
      }
    });
    return promesa;
  }

}
