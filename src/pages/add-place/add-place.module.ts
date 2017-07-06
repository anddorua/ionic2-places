import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPlacePage } from './add-place';
import { MapsModule } from "../../shared/maps.module";

@NgModule({
  declarations: [
    AddPlacePage,
  ],
  imports: [
    IonicPageModule.forChild(AddPlacePage),
    MapsModule
  ],
  exports: [
    AddPlacePage
  ]
})
export class AddPlacePageModule {}
