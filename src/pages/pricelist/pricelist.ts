import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Content } from 'ionic-angular';
import { ScrollHideConfig } from '../../directives/directives-scroll-hide/directives-scroll-hide';
import { HomePage } from '../home/home';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Datakonsumen } from '../../models/datakonsumen';


@IonicPage()
@Component({
  selector: 'page-pricelist',
  templateUrl: 'pricelist.html',
})
export class PricelistPage {
  dataisnull: boolean;
  taglist: any;
  segment: string;
  divstatus: string;


  @ViewChild('pageTop') pageTop: Content;
  @ViewChild(Content) content: Content;


  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 35 };
  headerScrollConfig2: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 51 };


  datakonsumen: any;
  datakonsumeny: any;
  datakonsumenx: AngularFirestoreCollection<any>;


  datadetail = {} as Datakonsumen;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public firestore: AngularFirestore,) {

      this.divstatus = "normal";

      this.taglist = "Keyboard";

      this.segment = "graph1";

      this.getdata();

      this.dataisnull = true;
  }


  // =================================== SHOW DATA  =============================================
    graph1()
    {
      this.segment = "graph1";
      this.getdata();
    }
    graph2()
    {
      this.segment = "graph2"
      this.getdata();
    }

    back()
    {
        this.navCtrl.push(HomePage); 
    }


    async filterlist() 
    {
        const alert = await this.alertCtrl.create({
          title: 'Price List Of',
          inputs: [
            {
              name: 'Keyboard',
              type: 'radio',
              label: 'Keyboard',
              value: 'Keyboard',
              checked: true
            },
            {
              name: 'LED',
              type: 'radio',
              label: 'LED',
              value: 'LED'
            },
            {
              name: 'Adaptor',
              type: 'radio',
              label: 'Adaptor',
              value: 'Adaptor'
            },
            {
              name: 'Hardisk',
              type: 'radio',
              label: 'Hardisk',
              value: 'Hardisk'
            },
            {
              name: 'Battery',
              type: 'radio',
              label: 'Battery',
              value: 'Battery'
            },
            {
              name: 'RAM',
              type: 'radio',
              label: 'RAM',
              value: 'RAM'
            },
            {
              name: 'Fan',
              type: 'radio',
              label: 'Fan',
              value: 'Fan'
            },
            {
              name: 'CD Room',
              type: 'radio',
              label: 'CD Room',
              value: 'CDRoom'
            },
            {
              name: 'Flexible',
              type: 'radio',
              label: 'Flexible',
              value: 'Flexible'
            },
            {
              name: 'CMOS Battery',
              type: 'radio',
              label: 'CMOS Battery',
              value: 'CMOSBattery'
            },


          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            }, {
              text: 'Ok',
              handler: data => {
                console.log(data);

                this.taglist = data;
                this.getdata();

                // this.inputhardware = data;
                
              }
            }
          ]
        });
    
        await alert.present();
    }


    getdata()
    {
      var hardware = this.taglist;
      if (this.segment == "graph1" && hardware != "Battery")
      {


        this.datakonsumenx = this.firestore.collection<any>(`price_list/${hardware}/list/`,ref => ref.orderBy('pricelist', 'asc'));
        this.datakonsumeny=this.datakonsumenx.valueChanges();
        this.datakonsumeny.subscribe(jk=>{
            this.datakonsumen = jk;
            // console.table(jk);
            this.datanullornot();
            this.content.scrollToTop();
          });


      }
      else if (this.segment == "graph2" && hardware != "Battery")
      {

        
        this.datakonsumenx = this.firestore.collection<any>(`price_list/${hardware}/list/`,ref => ref.orderBy('pricelist', 'desc'));
        this.datakonsumeny=this.datakonsumenx.valueChanges();
        this.datakonsumeny.subscribe(jk=>{
            this.datakonsumen = jk;
            // console.table(jk);
            this.datanullornot();
            this.content.scrollToTop();
          });
      }
      else if (this.segment == "graph1" && hardware == "Battery")
      {


        this.datakonsumenx = this.firestore.collection<any>(`price_list/${hardware}/list/`,ref => ref.orderBy('battery_original_price', 'asc'));
        this.datakonsumeny=this.datakonsumenx.valueChanges();
        this.datakonsumeny.subscribe(jk=>{
            this.datakonsumen = jk;
            // console.table(jk);
            this.datanullornot();
            this.content.scrollToTop();
          });


      }
      else if (this.segment == "graph2" && hardware == "Battery")
      {

        
        this.datakonsumenx = this.firestore.collection<any>(`price_list/${hardware}/list/`,ref => ref.orderBy('battery_original_price', 'desc'));
        this.datakonsumeny=this.datakonsumenx.valueChanges();
        this.datakonsumeny.subscribe(jk=>{
            this.datakonsumen = jk;
            // console.table(jk);
            this.datanullornot();
            this.content.scrollToTop();
          });
      }


    }

    datanullornot()
    {

        if (this.datakonsumen.length == 0)
        {
          this.dataisnull = true;
        } 
        else if (this.datakonsumen.length >= 1)
        {
          this.dataisnull = false
        }

    }

  // =================================== DATAIL DATA  =============================================
    detaildata(x) 
    {

     // this.content.scrollToTop();

     
   
     this.datadetail= x;

     this.divstatus = 'modedetaildata';

    }
    
    closedetaildata()
    {
      this.divstatus = 'normal'
    }





}
