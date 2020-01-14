import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the QrScanProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToolBox {

  constructor(public http: HttpClient) {
    console.log('Hello QrScanProvider Provider');
  }

  static showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
 }

 static hideCamera() {    
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    let content = <HTMLElement>document.getElementsByTagName("body")[0];
    content.style.background = "white !important";
 }

}
