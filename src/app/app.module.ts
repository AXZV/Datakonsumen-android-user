import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { QRScanner } from '@ionic-native/qr-scanner';
import { LoadingProvider } from '../providers/loading/loading';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule} from 'angularfire2'; 
import { FIREBASE_CREDENTIALS } from './credentials';
import { HttpClientModule } from '@angular/common/http';
import { QrScanProvider } from '../providers/QrScan/QrScan';
import { InvoicePage } from '../pages/invoice/invoice';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { BookingPage } from '../pages/booking/booking';
import { PricelistPage } from '../pages/pricelist/pricelist';
import { ScrollHideDirective } from '../directives/directives-scroll-hide/directives-scroll-hide';
import { SearchPipe } from '../pipes/search/search';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Device } from '@ionic-native/device';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InvoicePage,
    BookingPage,
    PricelistPage,
    SearchPipe,
    ScrollHideDirective,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFirestoreModule,
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InvoicePage,
    BookingPage,
    PricelistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QRScanner,
    LoadingProvider,
    QrScanProvider,
    File,
    FileOpener,
    SocialSharing,
    Device,
    InAppBrowser,
    AppAvailability

  ]
})
export class AppModule {}
