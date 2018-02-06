import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../config/webservice.config';
import { LoadingController, AlertController, ToastController } from 'ionic-angular';

@Injectable()
export class UsuarioProvider {

  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    console.log('Hello UsuarioProvider Provider');
  }

  login(user){
    let loader = this.loadingCtrl.create({
      content: 'Verificando...'
    });
    loader.present();
    let promesa = new Promise((resolve, reject) => {
      let body = new FormData();
      body.append('email', user.email);
      body.append('password', user.password);
      let url = BASE_URL + 'User/login';
      this.http.post(url, body).subscribe((response) => {
        if(response['error']){
          this.toast(response['message']);
          resolve(false);
        }else{
          console.log(response);
          resolve(true);
        }
      }, (error) => {
        reject();
      }, () => {
        loader.dismiss();
        console.log('HTTP complete!');
      });
    });
    return promesa;
  }

  toast(msg){
    this.toastCtrl.create({
      message: msg,
      duration: 4000
    }).present();
  }

}
