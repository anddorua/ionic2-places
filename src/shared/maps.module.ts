import {NgModule} from "@angular/core";
import {AgmCoreModule} from "@agm/core";

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBgUlW_32X6CtKs42p_HvG1mOzomyjiud0'
    })
  ],
  exports: [
    AgmCoreModule
  ]
})
export class MapsModule {

}
