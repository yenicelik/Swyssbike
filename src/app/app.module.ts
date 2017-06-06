import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import {Geolocation} from '@ionic-native/geolocation';

import {Facebook} from '@ionic-native/facebook';
import {GooglePlus} from '@ionic-native/google-plus';


import {AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {RentBikePage} from '../pages/rent-bike/rent-bike';
import {LoginPage} from '../pages/login/login';

import { BikeDbProvider } from '../providers/bike-db/bike-db';
import { PermissionControlProvider } from '../providers/permission-control/permission-control';
import { UserControllerProvider } from '../providers/user-controller/user-controller';
import { AuthProvider } from '../providers/auth/auth';



const firebaseConfig={
  apiKey: "AIzaSyChC62HAtPWAtFiJmcDlTGWwq_YFOjSNqE",
  authDomain: "protobike-1495735501799.firebaseapp.com",
  databaseURL: "https://protobike-1495735501799.firebaseio.com",
  projectId: "protobike-1495735501799",
  storageBucket: "protobike-1495735501799.appspot.com",
  messagingSenderId: "777348050122"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RentBikePage,
      LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
      AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RentBikePage,
      LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BikeDbProvider,
    PermissionControlProvider,
    UserControllerProvider,
    AuthProvider,
      Facebook,
      GooglePlus
  ]
})
export class AppModule {}
