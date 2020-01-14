import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';


@Injectable()
export class LoadingProvider {

  loading: Loading;

  constructor(

    public loadingCtrl: LoadingController,
    
  ){
    
  }


      presentWithGif1() {
          this.loading = this.loadingCtrl.create({
              spinner: 'hide',
              content: `
            <div class="custom-spinner-container">

              <img class="loading"  src="assets/gif/load12.gif" />
              <div class="typewriter">
                <p class="loadingtext"> Unknown  Man  Studio </p>
              <div>

            </div>`
          });
          
          return this.loading.present();
      }


      dismiss() {
          return new Promise((resolve, reject) => {
              if (this.loading) {
                    // this.loading = null;
                  return this.loading.dismiss(resolve(true)).catch(error => {
                      console.log('loading error: ', error);
                  });
              } else {
                  resolve(true);
              }
          });

      }
}


