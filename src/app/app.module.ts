import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, enableProdMode } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { FavoritosPage, BuscarPage, MensajesPage, PublicarPage, PerfilPage, ChatPage, BienvenidaPage, LoginPage, RegistroPage } from '../pages/index.pages'

import { PopOptiosPerfil } from '../pages/popMenu/pop-optios-perfil/pop-optios-perfil';
import { SharePopMenu } from '../pages/popMenu/share-pop-menu/share-pop-menu';

import { Ionic2RatingModule } from 'ionic2-rating'; //Sistema de Rating



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FavoritosPage,
    BuscarPage,
    MensajesPage,
    PublicarPage,
    PerfilPage,
    ChatPage,
    BienvenidaPage,
    LoginPage,
    RegistroPage,
    PopOptiosPerfil,
    SharePopMenu
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FavoritosPage,
    BuscarPage,
    MensajesPage,
    PublicarPage,
    PerfilPage,
    ChatPage,
    BienvenidaPage,
    LoginPage,
    RegistroPage,
    PopOptiosPerfil,
    SharePopMenu
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
