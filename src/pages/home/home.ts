import { Component } from '@angular/core';
import {IonicPage, ModalController} from 'ionic-angular';
import {AddPlacePage} from "../add-place/add-place";
import {Place} from "../../models/place";
import {PlacesService} from "../../services/places";
import {PlacePage} from "../place/place";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  addPlacePage = AddPlacePage;
  places: Place[] = [];

  constructor (
    private placesService: PlacesService,
    private modalCtrl: ModalController
  ){}

  ionViewWillEnter() {
      this.placesService.getAll()
        .then(places => this.places = places);
  }

  onOpenPlace(place: Place, index: number) {
    const modal = this.modalCtrl.create(PlacePage, { place: place, index: index });
    modal.present();
    modal.onDidDismiss(data => {
      if (data && data.modified) {
        this.placesService.getAll()
          .then(places => this.places = places);
      }
    });
  }
}
