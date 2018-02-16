import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';

import { UsuarioProvider } from '../providers/usuario/usuario';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(
    private platform: Platform,
    statusBar: StatusBar,
    private storage: Storage,
    private user: UsuarioProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      storage.ready().then(() => {
        this.initApp().then(() => {
          statusBar.styleDefault();
          console.log("App loaded!");
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
        this.storage.get('token').then((token) => {
          if(token){
            this.rootPage = HomePage;
            resolve();
          }else{
            this.rootPage = IntroPage;
            resolve();
          }
        });
      }else{
        if(this.user.token){
          this.rootPage = HomePage;
          resolve();
        }else{
          this.rootPage = IntroPage;
          resolve();
        }
      }
    });
    return promesa;
  }

}
