import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {SetLocationPageModule} from "../pages/set-location/set-location.module";
import {PlacePageModule} from "../pages/place/place.module";
import {HomePageModule} from "../pages/home/home.module";
import {AddPlacePageModule} from "../pages/add-place/add-place.module";
import {Camera} from "@ionic-native/camera";
import {Geolocation} from "@ionic-native/geolocation";
import {File} from "@ionic-native/file";
import { IonicStorageModule } from '@ionic/storage';
import {PlacesService} from "../services/places";


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AddPlacePageModule,
    HomePageModule,
    PlacePageModule,
    SetLocationPageModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    Geolocation,
    PlacesService,
    File
  ]
})
export class AppModule {}
