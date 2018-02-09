import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { PopoverController } from 'ionic-angular'; // Controlador para los Pops
import { UsuarioProvider } from '../../providers/usuario/usuario';

import { PopOptiosPerfil } from '../popMenu/pop-optios-perfil/pop-optios-perfil'; //La pagina de contenido del Pop

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  user: any;
  isEdit: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popCtrl: PopoverController,
    private platform: Platform,
    private usuario: UsuarioProvider
  ) {
    this.user = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  ionViewWillEnter(){
    //Este bloque se ejecutara antes de que la vista entre a la pantalla
    if(this.navParams.get('user_id')){
      //Busca si llega un parametro desde el nav
      console.log('Checa el perfil de otro usuario');
      //Ejecuta una funcion que regresa una promesa
      this.usuario.load_user_data(this.usuario.user_id).then((user:any) => {
        //Se completo, recibe un objeto user como respuesta y lo almacena temporalmente
        this.user = user;
      }).catch(() => {
        //La promesa se rechazo por alguna razon, puede o no recibir un objeto o variable
        console.log('Error!');
      });
    }else{
      //Carga el usuario almacenado en el servicio
      this.user = this.usuario.user;
    }
  }

  onModelChange(event){
    console.log(event);
  }
  //Lanza el Pop 
  openPop(event){
    //Crea una instancia de tipo popMenu usando una pagina diseñada especificamente para eso
      let popMenu = this.popCtrl.create(PopOptiosPerfil);
      //Presenta la instancia en la pantalla usando los parametros del evento
      popMenu.present({ev:event});
  }

}
