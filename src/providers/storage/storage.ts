import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class StorageProvider {

  constructor(
    private storage: Storage, 
    private platform: Platform
  ) {
    console.log('Storage Service Loaded');
  }

  getSession(){
    if(this.platform.is('cordova')){
      this.storage.get('session').then((session) => {
        return session;
      }).catch(() => {
        return false;
      });
    }else{
      let session = localStorage.getItem('session');
      if(session){
        return session;
      }else{
        return false;
      }
    }

  }

  saveSession(data:any){
    let promesa = new Promise((resolve, reject) => {
      if(this.platform.is('cordova')){
        this.storage.set('session', data).then(() => {
          resolve(true);
        }).catch(() => {
          reject();
        });
      }else{
        localStorage.setItem('session', JSON.stringify(data));
        resolve(true);
      }
    });
    return promesa;
  }
}
