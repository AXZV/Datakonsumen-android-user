import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Datakonsumen } from '../../models/datakonsumen';
import { HomePage } from '../home/home';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { LoadingProvider } from '../../providers/loading/loading';
import * as moment from 'moment';



@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {
  antrian: any;
  iddd: string;
  dkk: Datakonsumen;

  mydata: any;
  nokonsumen: any;
  nokonsumeny: any;
  nokonsumenx: AngularFirestoreCollection<any>;

  datakons: any;
  datakonsy: any;
  datakonsx: AngularFirestoreCollection<any>;
  mydatakons: any;


// ---------------------------------------------------------------------------------------------
  datakonsumen = {} as Datakonsumen;
// ---------------------------------------------------------------------------------------------

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firestore: AngularFirestore,
    public loadingCtrl:LoadingProvider,
    public toastCtrl: ToastController,) 
  {
    this.datakonsumen.no_hp='+62';

    this.getdatakons();
  }

  back()
  {
    this.navCtrl.push(HomePage); 
  }

  ionViewDidLoad() 
  {
    this.nokonsumenx = this.firestore.collection<any>('jumlah_konsumen');
    this.nokonsumeny=this.nokonsumenx.valueChanges();
    this.nokonsumeny.subscribe(nk=>{
        this.nokonsumen = nk;
        this.mydata = this.nokonsumen[Math.floor((Math.random() * this.nokonsumen.length) + 0)];
      });


  }

  getdatakons()
  {
    this.datakonsx = this.firestore.collection<any>('data_konsumen',ref => ref.where('status', '==', 4).where('third_party_job', '==', false));
    this.datakonsy=this.datakonsx.valueChanges();
    this.datakonsy.subscribe(nk=>{
        this.datakons = nk;
        this.jmlhantrian();
      });

  }

  jmlhantrian()
  {
    var xx=this.datakons.length;
    this.antrian = xx + 1;
    console.log(this.antrian);
  }

  generatenokonsumen()
{
  // --------------------------------------Loading-----------------------------------------------
  this.loadingCtrl.presentWithGif1();
  // --------------------------------------------------------------------------------------------
    this.mydata = this.nokonsumen[Math.floor((Math.random() * this.nokonsumen.length) + 0)];
  // --------------------------------------------------------------------------------------------
    this.firestore.doc<any>(`jumlah_konsumen/JK`).update({
      jumlahkonsumen:this.mydata.jumlahkonsumen + 1,
      }).then((snapshot)=> {

          this.save();

        
      }).catch(function(error){
        this.loadingCtrl.dismiss();
        console.log("Error generate no konsumen", error);
      })

}


save()
{

    console.log("tambah data konsumen baru ke firestore");
  // ------------------------------------No Konsumen---------------------------------------------
    var nkonsumen =this.mydata.jumlahkonsumen;
  // -----------------------------------Random String---------------------------------------------
    var text = ""; 
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
    for (var i = 0; i < 2; i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length));   
  // ---------------------------------------------------------------------------------------------
    var dk=this.datakonsumen;

    this.dkk=this.datakonsumen

    var datenow=moment().format('D MMMM YYYY');
    var idkonsumen="su"+nkonsumen+text;
    console.log(idkonsumen);
    this.iddd=idkonsumen;
  // ---------------------------------------------------------------------------------------------
      this.firestore.doc(`data_booking_konsumen/${idkonsumen}`).set({
        id_konsumen     :idkonsumen,
        no_konsumen     :nkonsumen,
        tanggal_masuk   :datenow,
        tanggal_keluar  :'-',
        nama_konsumen   :dk.nama_konsumen,
        merek           :dk.merek,
        kelengkapan     :'-',
        no_hp           :dk.no_hp,
        problem_desk    :dk.problem_desk,
        catatan         :'-',
        biaya           :0,
        status          :1,
        third_party_job   :false,
        third_party_name  :"-",
        third_party_transfer_date   :"-",
        deviceId        :'adminsu'
      }).then((snapshot)=> {
        this.navCtrl.push(HomePage);
        console.log("Sukses tambah data booking konsumen");

        // this.sendwasttusaccepted();

        this.loadingCtrl.dismiss();
        this.toastCtrl.create({
          message: 'Status Booking anda sudah terkirim',
          duration: 3000
      }).present();
      
    }).catch(e =>{
      console.log("gagal tambah data konsumen : ",e);
      this.loadingCtrl.dismiss();

      this.loadingCtrl.dismiss();
      this.toastCtrl.create({
        message: 'Gagal Tambah Data Konsumen',
        duration: 3000
    }).present();

    })      

}


}
