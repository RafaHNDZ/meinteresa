import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../config/webservice.config';
import { LoadingController, AlertController, ToastController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { Header } from 'ionic-angular/components/toolbar/toolbar-header';

@Injectable()
export class UsuarioProvider {

  token: string = null;
  user_id: string = null;
  user: any;

  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private storage: Storage,
    private secureStorage: SecureStorage,
    private platform: Platform
  ) {
    console.log('User Provider Loaded!');
    this.load_session();
  }

  //Realiza el login hacia el REST Service
  login(user){
    //Instanciar una vista de componente loader para mostrar en la pantalla
    let loader = this.loadingCtrl.create({
      content: 'Verificando...'
    });
    //Presentar el lodaer
    loader.present();
    //Instanciar una nueva promesa
    /**
     * Una promesa es una funcion asincrona que terminara hasta que se resuelva(resolve) o se rechace(reject)
     */
    let promesa = new Promise((resolve, reject) => {
      //Desde aqui el codigo es el de las funciones de siempre...
      //Se instancia un objeto de tipo FormdData para empaquetar archivos mediante POST
      let body = new FormData();
      //Se agregan los datos al objeto formData
      body.append('email', user.email);
      body.append('password', user.password);
      //Se genera la URL de la petición
      let url = BASE_URL + 'User/login';
      /**
       * Se usa el objeto http para realizar una peticion POST enviando la URL y el cuerpo de la petición, se procesa
       * con la función subscribe
       */
      this.http.post(url, body).subscribe((response) => {
        //Metodo next, recibe la respuesta del servidor, puedes llamarla como quieras, por nomas yo uso response
        //y solo queda procesar la data que se recibe
        if(response['error']){
          this.toast(response['message']);
          //Se resuelve la promesa y se envia un false ya que ocurrio un error
          resolve(false);
        }else{
          //Se reciben los datos del usuario en la petición
          this.token = response['token'];
          this.user_id = response['user_id'];
          this.save_session();
          this.load_user_data(this.user);
          //Se resuelve la promesa y se envia un true ya que se completo con exito
          resolve(true);
        }
      }, (error) => {
        //Metodo error, se ejecuta cuando se reibne algun codigo de error del servidor
        reject();
      }, () => {
        //Complete, se ejecuta al final de la petición
        loader.dismiss();
        console.log('HTTP complete!');
      });
    });
    //IMPORTANTE, asegurate de regresar la promesa o esta no sera reconocida al llamar a la función
    return promesa;
  }

  save_session(){
    if(this.platform.is("cordova")){
      this.storage.ready().then(()=>{
        this.storage.set('token', this.token).then(() => {
          console.log('Token guardado');
        });
        this.storage.set('user_id', this.user_id).then(() => {
          console.log('UserID guardado');
        });
      });
    }else{
      if(this.token){
        localStorage.setItem('token', this.token);
        localStorage.setItem('user_id', this.user_id);
      }else{
        localStorage.removeItem('user_id');
        localStorage.removeItem('token');
      }
    }
  }

  load_session(){
    //Comprobar si la instancia esta en un telefono(nativo) o en un navegador(test)
    if(this.platform.is("cordova")){
      this.storage.ready().then(() => {
        this.storage.get('token').then((token) => {
          if(token){
            this.token = token;
            console.log('Token: ' + token);
          }
        });
        this.storage.get("user_id").then((user_id) => {
          if(user_id){
            this.user_id = user_id;
            console.log('User ID: ' + user_id);
          }
        });
      }).catch(() => {
        this.toastCtrl.create({
          message: 'Error al cargar la sesion',
          closeButtonText: "Ok",
          showCloseButton: true
        }).present();
      });
    }else{
      if(localStorage.getItem("token")){
       this.token = localStorage.getItem('token');
       this.user_id = localStorage.getItem('user_id');
      }
    }
    if(this.user_id){
      this.load_user_data(this.user_id).then((user: any) => {
        if(user){
          this.user = user;
        }
      }).catch(() => {
        this.toast('Error al cargar datos del usuario');
      });
    }
  }

  load_user_data(user: string){
    console.log("Cargando datos del usuario...");
    let promesa = new Promise((resolve, reject) => {
      let url = BASE_URL + 'User/user/' + user;
      this.http.get(url).subscribe((response) => {
        if(response['error']){
          this.toast(response['message']);
          reject();
        }else{
          resolve(response['user']);
        }
      }, (error) => {
        console.log(error);
        reject();
      }, () => {
        reject();
      });
    });
    return promesa;
  }

  colse_session(){
    //Borrar la sesion y datos
    this.token = null;
    this.user_id = null;
    this.user = null;
    this.save_session();
  }

  toast(msg){
    //Mostrar un toast con un mensaje especifico
    this.toastCtrl.create({
      message: msg,
      duration: 4000
    }).present();
  }

}
