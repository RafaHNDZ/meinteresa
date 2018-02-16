import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistroProvider } from '../../providers/registro/registro';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-publicar',
  templateUrl: 'publicar.html',
})
export class PublicarPage {

  filesToUpload: Array<File>;
  preview: string = "";
  fabricantes: any;
  payMethod: string = "one";
  postForm: FormGroup;
  modelos: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _registro: RegistroProvider,
    private fb: FormBuilder) {
      this.initForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicarPage');
    this._registro.getFabricantes().then((fabricantes) => {
      if(fabricantes){
        this.fabricantes = fabricantes;
      }
    }).then((error) => {
      console.log(error);
    });
  }

  initForm(){
    this.postForm = this.fb.group({
      fabricante: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      version: new FormControl('', Validators.required),
      conservacion: new FormControl('', Validators.required),
      motor: new FormControl('', Validators.required),
      kilometraje: new FormControl('', Validators.required),
      combustible: new FormControl('', Validators.required),
      transmision: new FormControl('', Validators.required),
      puertas: new FormControl('', Validators.required),
      asientos: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required)
    });
  }

  getModelos(e){
    this._registro.getModelos(e).then((modelos) => {
      if(modelos){
        this.modelos = modelos;
      }
    });
  }

  onSumbit(){
    console.log(this.postForm.value);
  }

  onImgSelected(fileInput: any){
    let gallery = document.getElementById('gallery');
    gallery.innerText = '';
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
    /**
    let preview = new FileReader();
    preview.onload = (e:any) => {
      this.preview = e.target.result;
    }
    preview.readAsDataURL(fileInput.target.files[0]);
    console.log(this.filesToUpload);
    **/
    for(let i = 0; i <= this.filesToUpload.length; i++){
      let file = this.filesToUpload[i];
      console.log(file);
        if(file){
          try{
            let url = URL.createObjectURL(file);
            let img = document.createElement('img');
            img.setAttribute('src', url);
            img.setAttribute('class', 'preview img');
            gallery.appendChild(img);
          }catch (e){

          }
        }
    }
  }

}
