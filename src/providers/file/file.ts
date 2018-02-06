import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FileProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FileProvider Provider');
  }

  upload(url: string, files: Array<File>, name:string, type: string, uploader: string){
    let promesa = new Promise((resolve, reject) => {
      if(files){
        let data = new FormData();
        //data.append('type', type);
        data.append('uploader', uploader);
        for(var i = 0; i < files.length; i++){
          data.append(name, files[i], files[i].name);
        }
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.onload = function() {
          if (xhr.status == 200) {
            console.log("Sucess! Upload completed");
            resolve(xhr.response);
          } else {
            console.log("Error! Upload failed");
            reject();
          }
        };
        xhr.onerror = function() {
          alert("Error! Upload failed. Can not connect to server.");
          reject();
        };
        xhr.send(data);
      }else{
        console.log('No se ha seleccionado ningun archivo');
        reject();
      }
    });
    return promesa;
  }
}
