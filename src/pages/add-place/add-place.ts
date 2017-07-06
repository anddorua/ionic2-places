import { Component } from '@angular/core';
import {IonicPage, ModalController, LoadingController, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import { Location } from "../../models/location";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, Entry } from '@ionic-native/file';
import {PlacesService} from "../../services/places";

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  location: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  isSetLocation: boolean = false;
  imageUrl: string = '';

  constructor(
    private modalCtrl: ModalController,
    private geolocation: Geolocation,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    private camera: Camera,
    private placesService: PlacesService,
    private file: File
  ) {}

  private clearData() {
    this.location =new Location(40.7624324, -73.9759827);
    this.isSetLocation = false;
    this.imageUrl = '';
  }

  onSubmit(f: NgForm) {
    console.log(f);
    this.placesService.add(f.value.title, f.value.description, this.location, this.imageUrl);
    f.reset();
    this.clearData();
  }

  onLocate() {
    const loader = this.loadCtrl.create({ content: 'Getting position ...' });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(
        position => {
          this.location.lat = position.coords.latitude;
          this.location.lng = position.coords.longitude;
          this.isSetLocation = true;
          loader.dismiss();
        },
        error => {
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Error getting position',
            duration: 2500
          });
          toast.present();
        })
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, { location: this.location, isSet: this.isSetLocation });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.location = data.location;
        this.isSetLocation = true;
      }
    });
  }

  onTakePhoto() {
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    };
    this.camera.getPicture(cameraOptions)
      .then(
        imageData => {
          const currentName = imageData.replace(/^.*[\\\/]/, '');
          const path = imageData.replace(currentName, '');
          console.log(`imageData=${imageData}`);
          console.log(`path=${path}`);
          console.log(`currentName=${currentName}`);
          console.log(`to=${this.file.dataDirectory}`);
          this.file.moveFile(path, currentName, this.file.dataDirectory, currentName)
            .then((entry: Entry) => {
              this.imageUrl = entry.nativeURL;
              this.camera.cleanup();
            })
            .catch(error => {
              console.warn(error);
              this.imageUrl = '';
              const toast = this.toastCtrl.create({
                message: 'Could not save the image. Please, try again.',
                duration: 2500
              });
              toast.present();
              this.camera.cleanup();
            });
        },
        error => {
          this.imageUrl = '';
          const toast = this.toastCtrl.create({
            message: 'Could not take the image. Please, try again.',
            duration: 2500
          });
          toast.present();
          this.camera.cleanup();
        });
  }
}
