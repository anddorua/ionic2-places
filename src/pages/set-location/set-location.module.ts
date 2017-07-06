import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetLocationPage } from './set-location';
import {MapsModule} from "../../shared/maps.module";

@NgModule({
  declarations: [
    SetLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(SetLocationPage),
    MapsModule
  ],
  exports: [
    SetLocationPage
  ]
})
export class SetLocationPageModule {}
