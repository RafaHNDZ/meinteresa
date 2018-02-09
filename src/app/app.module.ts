import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, enableProdMode } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { RegistroProvider } from '../providers/providers.index';

import { FavoritosPage, BuscarPage, MensajesPage, PublicarPage, PerfilPage, ChatPage, BienvenidaPage, LoginPage, RegistroPage, IntroPage } from '../pages/index.pages'

import { PopOptiosPerfil } from '../pages/popMenu/pop-optios-perfil/pop-optios-perfil';
import { SharePopMenu } from '../pages/popMenu/share-pop-menu/share-pop-menu';

import { Ionic2RatingModule } from 'ionic2-rating'; //Sistema de Rating
import { IonicStorageModule } from '@ionic/storage';
import { FileProvider } from '../providers/file/file';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { StorageProvider } from '../providers/storage/storage';
import { SecureStorage } from '@ionic-native/secure-storage';

enableProdMode();

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
    IntroPage,
    PopOptiosPerfil,
    SharePopMenu
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    Ionic2RatingModule,
    HttpClientModule
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
    IntroPage,
    PopOptiosPerfil,
    SharePopMenu
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RegistroProvider,
    FileProvider,
    UsuarioProvider,
    StorageProvider,
    SecureStorage
  ]
})
export class AppModule {}
