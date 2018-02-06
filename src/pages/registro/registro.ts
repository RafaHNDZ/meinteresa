import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { RegistroProvider } from '../../providers/providers.index';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {

  @ViewChild(Slides) slides: Slides;
  public filesToUpload: Array<File>;
  public avatarPreview = "assets/imgs/default_avatar.png";
  public formUser: FormGroup;
  public estados : any;
  public ciudades: any;
  success : boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private regisroSrv: RegistroProvider
  ) {
    this.initForm();
    this.success = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
    this.slides.paginationType = "progress";
    this.slides.lockSwipes(true);
  }

  initForm(){
    this.formUser = this.formBuilder.group({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]),
      password: new FormControl('',[Validators.required]),
      type: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      gener: new FormControl('', Validators.required),
      mobilePhone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]),
      pais: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required)
    });
  }

  getEstados(e){
    this.regisroSrv.getEstados(e).then((estados:any) => {
      this.estados = estados;
    }).catch(() => {
      console.log('Error en el servidor');
    });
  }

  getCiudades(e){
    this.regisroSrv.getCiudades(e).then((ciudades:any) => {
      this.ciudades = ciudades;
    }).catch(() => {

    });
  }

  next(){
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  back(){
    if(this.slides.isBeginning()){
      this.navCtrl.pop();
    }
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }

  dateChange(e){
    var dob= new Date(e);
    var fechaActual = new Date()
    var mes = fechaActual.getMonth();
    var dia = fechaActual.getDay();
    var ano = fechaActual.getFullYear();

    fechaActual.setDate(dia);
    fechaActual.setMonth(mes);
    fechaActual.setFullYear(ano);

    //var edad = Math.floor(((fechaActual - dob) / (1000 * 60 * 60 * 24) / 365));
  }

  onImgSelected(fileInput: any){
    let preview = new FileReader();
    preview.onload = (e:any) => {
      this.avatarPreview = e.target.result;
    }
    preview.readAsDataURL(fileInput.target.files[0]);
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

  onSubmit(){
    this.regisroSrv.register(this.formUser.value, this.filesToUpload).then((registred: boolean) => {
      if(!registred){

      }else{
        document.getElementById('dialog').setAttribute('hidden', 'true');
        document.getElementById('footer').setAttribute('hidden', 'true');
        document.getElementById('btn_back').setAttribute('hidden', 'true');
        document.getElementById('btn_next').setAttribute('hidden', 'true');
        this.success = true;
      }
    }).catch(() => {

    });
  }
}
