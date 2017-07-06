import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlacePage } from './place';
import { MapsModule } from "../../shared/maps.module";

@NgModule({
  declarations: [
    PlacePage,
  ],
  imports: [
    IonicPageModule.forChild(PlacePage),
    MapsModule
  ],
  exports: [
    PlacePage
  ]
})
export class PlacePageModule {}
