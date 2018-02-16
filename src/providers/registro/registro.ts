import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../config/webservice.config';
import { LoadingController, AlertController } from 'ionic-angular';

@Injectable()
export class RegistroProvider {

  estados : any;

  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) {
    console.log('Hello RegistroProvider Provider');
  }

  getEstados(pais){
    let loader = this.loadingCtrl.create({
      content: 'Espere...'
    });
    loader.present();
    let promesa = new Promise((resolve, reject) => {
      let url = BASE_URL + 'Estado/estados/' + pais;
      this.http.get(url).subscribe((response) => {
        if(response['error']){
          console.log(response['message']);
        }else{
          resolve(response['estados']);
        }
      }, (error) => {
        reject();
        loader.dismiss();
      }, () => {
        console.log('HTTP Request complete!');
        loader.dismiss();
      });
    });
    return promesa;
  }

  getCiudades(pais){
    let loader = this.loadingCtrl.create({
      content: 'Espere...'
    });
    loader.present();
    let promesa = new Promise((resolve, reject) => {
      let url = BASE_URL + 'Municipio/municipios/' + pais;
      this.http.get(url).subscribe((response) => {
        if(response['error']){
          console.log(response['message']);
        }else{
          resolve(response['ciudades']);
        }
      }, (error) => {
        reject();
        loader.dismiss();
      }, () => {
        console.log('HTTP Request complete!');
        loader.dismiss();
      });
    });
    return promesa;
  }

  getFabricantes(){
    let loader = this.loadingCtrl.create({
      content: 'Cargando fabricantes'
    });
    loader.present();
    let promesa = new Promise((resolve, reject) => {
      let url = BASE_URL + 'Fabricante';
      this.http.get(url).subscribe((response) => {
        if(response['error']){
          reject(response['message']);
        }else{
          resolve(response['fabricantes']);
        }
      }, (error) => {
        loader.dismiss();
        reject();
      }, () => {
        loader.dismiss();
      });
    });
    return promesa;
  }

  getModelos(fabricante){
    let loader = this.loadingCtrl.create({
      content: 'Cargando modelos'
    });
    loader.present();
    let promesa = new Promise((resolve, reject) => {
      let url = BASE_URL + 'Modelo/' + fabricante;
      this.http.get(url).subscribe((response) => {
        if(response['error']){
          this.showAlert(response['message']);
          reject();
        }else{
          resolve(response['modelos']);
        }
      }, (error) => {
        loader.dismiss();
        this.showAlert('Error en el servidor');
        reject();
      }, () => {
        loader.dismiss();
      });
    });
    return promesa;
  }

  register(user, file: Array<File>){
    let loader = this.loadingCtrl.create({
      content: 'Preparando...'
    });
    loader.present();
    let promesa = new Promise((resolve, reject) => {
      let url = BASE_URL + 'User/register';
      let body = new FormData();
      body.append('name', user.name);
      body.append('email', user.email);
      body.append('password', user.password);
      body.append('type', user.type);
      body.append('dob', user.dob);
      body.append('gener', user.gener);
      body.append('phone', user.mobilePhone);
      body.append('pais', user.pais);
      body.append('estado', user.estado);
      body.append('ciudad', user.ciudad);

      this.http.post(url, body,).subscribe((response) => {
        loader.setContent('Validando...');
        if(response['error']){
          this.showAlert('Revisa lo siguiente', response['form_errors']);
          loader.dismiss();
          resolve(false);
        }else{
          loader.dismiss();
          resolve(true);
        }
      }, (error) => {
        reject();
        loader.dismiss();
      }, () => {
        console.log('HTTP Request complete!');
      });
    });
    return promesa;
  }

  showAlert(titulo = 'Atencion', mensaje = '') {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
  }
/**
 *           loader.setContent('Cargando archivos...');
           let uploadUrl = BASE_URL + 'File/upload';
           this.fileService.upload(uploadUrl, file, 'files[]', 'avatar', response['user_id']).then((file_info:any) => {
             console.log("RP: " + file_info);
             if(file_info['errors']){
               resolve(false);
             }else{
               loader.dismiss();
               resolve(true);
             }
           }).catch(() => {
             loader.dismiss();
             reject();
           });
 */
}
