import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { LoadingProvider } from '../../providers/loading/loading';
import { HomePage } from '../home/home';
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@IonicPage()
@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
})
export class InvoicePage {
    base64imagesu: {};

    numb: any;

    datapembayarankonsumen: any;
    datapembayarankonsumeny: any;
    datapembayarankonsumenx: AngularFirestoreDocument<any>;
    
  value: any;


 
  pdfObj = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private plt: Platform,
    private file: File, 
    private fileOpener: FileOpener,
    public firestore: AngularFirestore,
    public loadingCtrl:LoadingProvider,

) {

         

      this.value = navParams.get('datakonsumen');
      console.log(this.value,"thisssss");

      this.loadingCtrl.presentWithGif1(); //show loading
      this.datapembayarankonsumenx = this.firestore.doc<any>(`data_pembayaran_konsumen/${this.value.id_konsumen}`);
      this.datapembayarankonsumeny=this.datapembayarankonsumenx.valueChanges();
      this.datapembayarankonsumeny.subscribe(jk=>{
          this.datapembayarankonsumen = jk;
        //   this.loadingCtrl.dismiss();//STOP loading
            this.base();// image su to base64
          console.log(this.datapembayarankonsumen);
         
      })
      
      

  }

  base()
  {
    const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }))
   
    toDataURL('../assets/imgs/su.png')
        .then(dataUrl => {
            this.base64imagesu = dataUrl;
        // console.log('RESULT:', dataUrl)
        this.generatenumb(); // generate number of detail pembayaran
        })
       
  }

  generatenumb()
  {
    var rows = this.datapembayarankonsumen.detailpembayaran;

    function createVariables(){
        let numbarray:any=[];   
        for (var i = 0; i < rows.length; ++i) {
            numbarray.push({"no":(i+1)})
        }     
        return numbarray;
      }

      this.numb = createVariables();
      this.createPdf();

  }
  ionViewDidLoad() {


    }

  createPdf() {


    var rows = this.datapembayarankonsumen.detailpembayaran;
    var numbs = this.numb


    // access object in rows
        var arrayprice = rows.map(function (data) {
        return data.price;
      });
      var arraydesc = rows.map(function (data) {
        return data.description;
      });
      var arrayqty = rows.map(function (data) {
        return data.qty;
      });
      var arrayitempricetotal = rows.map(function (data) {
        return data.itempricetotal;
      });
     // access object in numbs
      var arrayno = numbs.map(function (data) {
        return data.no;
      }); 

      // create new array for invoice datapembayaran

      let newarray:any=[]; 
      for(var z=1; z <= rows.length ;z++) {
        newarray.push({"no":arrayno[(z-1)],"description":arraydesc[(z-1)],"qty":arrayqty[(z-1)],"price":arrayprice[(z-1)],"itempricetotal":arrayitempricetotal[(z-1)]});
      }
      console.log(newarray,"newarray");


      ///// CREATE PDF
    var body = [];

    for (var key in newarray)
    {
        if (newarray.hasOwnProperty(key))
        {
            var data = newarray[key];
            var row = new Array();
            row.push( data.no.toString() );
            row.push( data.description.toString()  );
            row.push( data.qty.toString() );
            row.push( data.price.toString()  );
            row.push( data.itempricetotal.toString() );
            body.push(row);      
        }
    }

    var docDefinition = {
    background: function(currentPage, pageSize) {
        return {
            image : 'su',
            width: 400,
            alignment :'center',
            absolutePosition: {y: 250},
            opacity: 0.3
        }
        },  
      content: [
        
        {
        style: 'tableExample',
            table: {
        //   widths: ['18%', '82%'],
          widths: ['18%', '74%', '8%'],
          body: [
            [
                [
                    {
                        image : 'su',
                        width: 40,
                        margin :[0,-4,0,4],
                        alignment: 'center',

                    },
                    {text: 'SERVICE UNNES', bold:true, fontSize: 10, alignment :'center' },
                ],
                
                [
                    {text: 'Cempakasari Timur RT 03/ RW 01', alignment: 'right', fontSize: 10, margin: [0,0,0,0] },
                    {text: 'Sekaran, Kecamatan Gunungpati, Kota Semarang', alignment: 'right', fontSize: 10 },
                    {text: '08995556181', alignment: 'right', fontSize: 10, margin: [0,0.5,0,0.5] },
                    {text: 'COPY INVOICE SERVICE FORM NO: '+this.value.no_konsumen, alignment: 'right', fontSize: 10, bold: true },
                    
               ],

               [
                    { qr: this.value.id_konsumen , fit:60 }
               ]
                
            ],
          ]
        },
        layout: 'noBorders',
           
          },
          /// line
          {
              table: {
                      widths: ['*'],
                      body: [[" "], [" "]]
              },
              margin:[0,-15,0,-15],
              layout: {
                  hLineWidth: function(i, node) {
                      return (i === 0 || i === node.table.body.length) ? 0 : 3;
                  },
                  vLineWidth: function(i, node) {
                      return 0;
                  },
              }
          },          
//////////////////////////////////////////////////////////////////////
          {
            style: 'tableExample',
            table: {
          widths: ['15%','1%','34%', '16%','1%','33%'],
          body: [
            [
                [
                    {text: 'Nama', fontSize: 10 },
                    {text: 'No Handphone', fontSize: 10 },
                    {text: 'Email', fontSize: 10 },
                ],
                [
                    {text: ': ', fontSize: 10 },
                    {text: ': ', fontSize: 10 },
                    {text: ': ', fontSize: 10 },
                ],
                [
                    {text: this.value.nama_konsumen, fontSize: 10 },
                    {text: this.value.no_hp, margin:[0,2,0,0], fontSize: 10 },
                    {text: '-', fontSize: 10 },
                ],
                [
                    {text: 'Date', fontSize: 10 },
                    {text: 'Invoice Number', fontSize: 10 },
                    {text: 'Sales Rep.', fontSize: 10 },
               ],
               [
                    {text: ': ', fontSize: 10 },
                    {text: ': ', fontSize: 10 },
                    {text: ': ', fontSize: 10 },
                ],
                [
                  {text: this.value.tanggal_keluar, fontSize: 10 },
                  {text: this.value.no_konsumen,  margin:[0,1,0,0], fontSize: 10 },
                  {text: 'Service Unnes', fontSize: 10 },
                ],
                
            ],
          ]
        },
        layout: 'noBorders',
           
          },
          //// line
          {
              table: {
                      widths: ['*'],
                      body: [[" "], [" "]]
              },
              margin:[0,-15,0,-15],
              layout: {
                  hLineWidth: function(i, node) {
                      return (i === 0 || i === node.table.body.length) ? 0 : 3;
                  },
                  vLineWidth: function(i, node) {
                      return 0;
                  },
              }
          },
          {
            style: 'tableExample',
                table: {
              widths: ['100%'],
              body: [
                [
                    [
                        {text: 'ITEM INFORMATION', bold:true, margin:[0,0,0,0], fontSize: 10 },
                    ]
                    
                ],
              ]
            },
            layout: 'noBorders',
               
              },
              {
            style: 'tableExample',
                table: {
              widths: ['15%','1%','84%'],
              body: [
                [
                    [
                        {text: 'Brand', fontSize: 10 },
                        {text: 'Serial Number', fontSize: 10 },
                    ],
                    [
                        {text: ': ', fontSize: 10 },
                        {text: ': ', fontSize: 10 },
      
                    ],
                    [
                      {text: this.value.merek, fontSize: 10 },
                      {text: '-', fontSize: 10 },

                    ],
      
                    
                ],
              ]
            },
            layout: 'noBorders',
     
          },

//////////////////////////////////////////////////////////////////////
          {
			style: 'PROBLEM DESK',
	        table: {
				widths: ['100%'],
				body: [
					[
					    [
					        {text: 'PROBLEM DESCRIPTION', bold:true, margin:[0,0,0,0], fontSize: 10 },
					    ]
					    
					],
				]
			},
			layout: 'noBorders',
	       
        },
        {
			style: 'PROBLEM DESK',
	        table: {
				widths: ['5%','45%'],
				body: [
					[
                        [
					        {text: '*', alignment: 'right',margin:[0,0,0,0], fontSize: 10 }
					    ],
					    [
					        {text: this.value.problem_desk, margin:[0,0,0,0], fontSize: 10 },
					    ],

					    
					    
					],
				]
			},
			layout: 'noBorders',
	       
        },
//////////////////////////////////////////////////////////////////////
          {
        style: 'tableExample',
            table: {
          widths: ['100%'],
          body: [
            [
                [
                    {text: 'INVOICE INFORMATION', bold:true, margin:[0,0,0,0], fontSize: 10 },
                ]
                
            ],
          ]
        },
        layout: 'noBorders',
           
          },
          {
        style: 'INVOICE INFORMATION',
            table: {
          widths: ['5%','45%','10%','20%','20%'],
          body: [
            [
                [
                    {text: 'No.', margin:[0,0,0,0], fontSize: 10 },
                ],
                [
                    {text: 'Description', margin:[0,0,0,0], fontSize: 10 },
                ],
                [
                    {text: 'Qty', margin:[0,0,0,0], fontSize: 10 },
                ],
                [
                    {text: 'Service Price', margin:[0,0,0,0], fontSize: 10 },
                ],
                [
                    {text: 'Amount', margin:[0,0,0,0], fontSize: 10 },
                ],
                
                
            ],
          ]
        },
        layout: 'noBorders',
           
          },
          {
            style: 'INVOICE INFORMATION',
            table: {
                widths: ['5%','45%','10%','20%','20%'],
                headerRows: 1,
                body: body,
                fontSize: 10
            },
            layout: 'noBorders',
           
          },
           //// line
          {
              table: {
                      widths: ['*'],
                      body: [[" "], [" "]]
              },
              margin:[0,-15,0,-15],
              layout: {
                  hLineWidth: function(i, node) {
                      return (i === 0 || i === node.table.body.length) ? 0 : 1;
                  },
                  vLineWidth: function(i, node) {
                      return 0;
                  },
              }
          },
          {
        style: 'Total',
            table: {
          widths: ['5%','45%','10%','15%','5%','20%'],
          body: [
            [
                [],
                [],
                [],
                [
                    {text: 'Total', bold:true, margin:[5,0,0,0], fontSize: 10 },
                ],
                [
                    {text: ':', bold:true, margin:[0,0,0,0], alignment: 'right', fontSize: 10 },
                ],
                [
                    {text: this.datapembayarankonsumen.totalpembayaran,bold:true, margin:[0,0,0,0], fontSize: 10 },
                ]
                
                
            ],
          ]
        },
        layout: 'noBorders',
           
          },
          //// line
          {
              table: {
                      widths: ['*'],
                      body: [[" "], [" "]]
              },
              margin:[0,-15,0,-15],
              layout: {
                  hLineWidth: function(i, node) {
                      return (i === 0 || i === node.table.body.length) ? 0 : 3;
                  },
                  vLineWidth: function(i, node) {
                      return 0;
                  },
              }
          },

          //////////////////////////////////////////////////////////////////////


           {
        style: 'TTD',
            table: {
          widths: ['10%','40%','10%','50%'],
          body: [
            [
                          [],
                [
                    {text: 'Penerima,', bold:true, margin:[5,10,0,0], fontSize: 10 },
                ],
                [],
                [
                    {text: 'Customer Service,', bold:true, margin:[0,10,0,0], fontSize: 10 },
                ],
  
            ],
            [
                          [],
                [
                    {text: '_______________________', bold:true, margin:[5,50,0,0], fontSize: 10 },
                ],
                [],
                [
                    {text: '_______________________', bold:true, margin:[0,50,0,0], fontSize: 10 },
                ],
  
            ],
            [
                          [],
                [
                    {text: 'Sdr. '+this.value.nama_konsumen,  margin:[5,0,0,0], fontSize: 10 },
                ],
                [],
                [
                    {text: 'Service Unnes', margin:[0,0,0,0], fontSize: 10 },
                ],
  
            ],
          ]
        },
        layout: 'noBorders',
           
          },
    ],
    styles: {
  
    },
    images: {
        su: this.base64imagesu ,
	},
     pageSize: 'A4',
     pageMargins: [20,30,20,30]





    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.downloadPdf();
  }
 
  downloadPdf() {
    if (this.plt.is('cordova')) {


      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
        
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, `invoice_${this.value.id_konsumen}.pdf`, blob, { replace: true }).then(fileEntry => {
        this.loadingCtrl.dismiss();//STOP loading
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + `invoice_${this.value.id_konsumen}.pdf`, 'application/pdf');
         this.navarsip();
        })


      });
    } else {
      // On a browser simply use download!
      this.loadingCtrl.dismiss();//STOP loading
      this.pdfObj.download();
      this.navarsip();
    }
  }

  navarsip()
  {
    this.navCtrl.push(HomePage); 
  }





}
