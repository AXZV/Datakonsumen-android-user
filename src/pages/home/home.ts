import { Component, ViewChild } from '@angular/core';
import { NavController, Content, AlertController, Platform } from 'ionic-angular';
// import { QRScanner } from '@ionic-native/qr-scanner';
import { LoadingProvider } from '../../providers/loading/loading';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { QrScanProvider } from '../../providers/QrScan/QrScan';
import { ToolBox } from '../../providers/QrScan/ToolBox';
import { InvoicePage } from '../invoice/invoice';
import { BookingPage } from '../booking/booking';
import { PricelistPage } from '../pricelist/pricelist';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Device } from '@ionic-native/device';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    divinfo: boolean;
    divaboutus: boolean;
    divcontactus: boolean;

    segment: string;
    divdetailpembayaran: boolean;
    lightstatus: string;

    scan: boolean;
    divstatus: string;

  idscan: string;

  datapembayarankonsumen: any;
  datapembayarankonsumeny: any;
  datapembayarankonsumenx: AngularFirestoreDocument<any>;

  datakonsumen: any;
  datakonsumeny: any;
  datakonsumenx: AngularFirestoreDocument<any>;

  @ViewChild(Content) content: Content;



  constructor(
    platform: Platform, 
    public navCtrl: NavController,
    public loadingCtrl:LoadingProvider,
    public firestore: AngularFirestore,
    private qrscan: QrScanProvider,
    public alertCtrl: AlertController,
    private socialSharing: SocialSharing,
    private appAvailability: AppAvailability,
    private iab: InAppBrowser,
    private device: Device) {

        platform.registerBackButtonAction(() => {           
            this.scan=false;
            ToolBox.hideCamera();  
            this.qrscan.off_light();
        }, 0);

        this.scan=false;

        this.qrscan.light = "off";
        this.lightstatus = this.qrscan.light;

        this.divstatus = 'modenormal';

        // this.ujicoba();
        

        this.segment = 'graph1';

        this.divcontactus = false;

        this.divaboutus = false;

        this.divinfo = false;
  }

  print(datakonsumen)
  {
    this.navCtrl.push(InvoicePage, {datakonsumen:datakonsumen});
  }

  booking()
  {
    this.navCtrl.push(BookingPage)   
  }
  pricelist()
  {
    this.navCtrl.push(PricelistPage)   
  }

  contactus()
  {
    this.divcontactus = true;
  }
  closecontactus()
  {
    this.divcontactus = false;
  }
  aboutus()
  {
    this.divaboutus = true;
  }
  closeaboutus()
  {
    this.divaboutus = false;
  }
  info()
  {
    this.divinfo = true;
  }
  closeinfo()
  {
    this.divinfo = false;
  }


  sms()
  {

      this.socialSharing.shareViaSMS('', '08995556181').then(() => {
        console.log("sukses sms");
      }).catch((e) => {
        console.log("gagal sms", e);
      });
  }

  mail()
  {
    
    this.socialSharing.shareViaEmail('', '#ServiceUnnesCare', ['service.unnes@gmail.com']).then(() => {
        console.log("sukses email");
      }).catch((e) => {
        console.log("gagal email", e);
      });
  }
  
  launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string, username: string) {
    let app: string;
	if (this.device.platform === 'iOS') {
        app = iosSchemaName;
        this.checkapp(app, appUrl, httpUrl, username )
        console.log("ios");
	} else if (this.device.platform === 'Android') {
        app = androidPackageName;
        this.checkapp(app, appUrl, httpUrl, username )
        console.log("android");
	} else {
        let browser = this.iab.create(httpUrl + username, '_system');
        console.log(browser);
        console.log("web");
		return;
	}

	
}

checkapp(app: string, appUrl: string, httpUrl:string, username:string)
{

    this.appAvailability.check(app).then(
        () => { // success callback

            let browser = this.iab.create(httpUrl + username, '_system');
            console.log(browser);
            console.log("sukses");
        },() => { // error callback
 
            let browser = this.iab.create(httpUrl + username, '_system');
            console.log(browser);
            console.log("gagal");
            // browser.show();

		}
	);
}

instagram(username: string) {
	this.launchExternalApp('instagram://app',  'com.instagram.android', 'instagram://username?=', 'https://www.instagram.com/', username);
}



// -7.055584, 110.401450
openmaps()
{
    // var latitude  : '-7.055584';
    // var longitude : '110.401450';
    let destination = '-7.055613, 110.401461';

    if(this.device.platform === 'iOS'){
        window.open('maps://?q=' + destination, '_system');
        console.log("ios map");
    } else {
        // let label = encodeURI('My Label');
        this.iab.create('geo:0,0?q=' + '-7.055584, 110.401450', '_system');
        // window.open('geo:0,0?q=' + destination, '_system');
        console.log("android map");
    }
}


graph1()
{
    this.segment= 'graph1';
    this.content.scrollToTop();
}
graph2()
{
    this.segment= 'graph2';
    this.content.scrollToTop();
}

ujicoba()
{
    // this.divstatus = 'modedetaildata';
    this.idscan = 'su300';
    this.getdata();
}

modenormal()
{
    this.divstatus = 'modenormal';
}

scan_qr_code() 
{
    this.qrscan.light = "off";
    this.lightstatus = this.qrscan.light;
    this.scan=true;
    console.log("Scan start");   
    Promise.resolve("proceed")
    .then((k) => {  
        return this.qrscan.scan();
    }) .then((qrcode) => {   
        if (qrcode == "" || qrcode == undefined) {
            this.scan=false;
            return Promise.reject("invalid_qr_code");
        }
        this.scan=false;
        console.log("qr",qrcode);

        this.idscan = qrcode;

        this.qrscan.off_light();

        this.getdata()
        // return  your_method_with_passing_qr(qrcode);
    }) .then((data) => {
        this.scan=false;
         console.log("data",data);
    }).catch((error) => {  
       if (error == "invalid_qr_code") {
            this.scan=false;

            // console.log(your_custom_error_message);
        } else {
            this.scan=false;
            //handle error here.
        }
    }); 
}
exit_from_qr_scan():void 
{ 
    this.scan=false;
    ToolBox.hideCamera();  
    this.qrscan.off_light();
}

light_enable_desable():void 
{
    this.qrscan.enaable_desable_light();

    console.log(this.qrscan.light);

    if ( this.lightstatus == 'off')
    {
        this.lightstatus = 'on';
    }
    else if ( this.lightstatus == 'on')
    {
        this.lightstatus = 'off';
    }

    this.lightstatus = this.qrscan.light;
      
}


searchBycode(trackingcode)
{
    console.log(trackingcode);
    this.idscan = trackingcode;
    this.getdata();
}

getdata()
{

    let nomacthdata = this.alertCtrl.create({
        message: "We can't find any data, please check your code again",
        buttons: ['Dismiss'],
      }); /// alert wrong code or qr

    console.log(this.idscan,"getdata");

    this.loadingCtrl.presentWithGif1(); //show loading

    this.datakonsumenx = this.firestore.doc<any>(`data_konsumen/${this.idscan}`);
    this.datakonsumeny=this.datakonsumenx.valueChanges();
    this.datakonsumeny.subscribe(jk=>{

        if (jk == null)
        {
            console.log("wrong code or qrcode");
            this.loadingCtrl.dismiss();//STOP loading
            nomacthdata.present();
        }
        else
        {
            this.datakonsumen = jk;
            console.log(this.datakonsumen);
            
            if (this.datakonsumen.status == 5)
            {

                this.datapembayarankonsumenx = this.firestore.doc<any>(`data_pembayaran_konsumen/${this.idscan}`);
                this.datapembayarankonsumeny=this.datapembayarankonsumenx.valueChanges();
                this.datapembayarankonsumeny.subscribe(jk=>{
        
                    this.loadingCtrl.dismiss();//STOP loading
        
                    this.datapembayarankonsumen = jk;
                    this.divstatus = 'modedetaildata';
                    console.log(this.datapembayarankonsumen);
        
                })
            }
            else if ( this.datakonsumen.status != 5 )
            {
                console.log("data status no 5, no need get datapembayaran");
                this.loadingCtrl.dismiss();//STOP loading
                this.divstatus = 'modedetaildata';   
            }

        }
      
    })

}

detailpembayaran()
{
  this.divdetailpembayaran = true;
  this.content.scrollToTop();
}
closedivdetailpembayaran()
{
  this.divdetailpembayaran = false;
}


  
}
