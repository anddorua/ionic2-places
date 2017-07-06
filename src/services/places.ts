import {Place} from "../models/place";
import {Location} from "../models/location";
import { Storage } from '@ionic/storage';
import {Injectable} from "@angular/core";
import { File } from '@ionic-native/file';
import Rx from 'rxjs/Rx';

@Injectable()
export class PlacesService {
  private places: Place[] = [];
  private readySubject: Rx.ReplaySubject<boolean>;

  constructor(
    private storage: Storage,
    private file: File
  ){
    this.fetchPlaces();
  }

  private fetchPlaces() {
    this.readySubject = new Rx.ReplaySubject(1);
    this.storage.get('places')
      .then((places: Place[]) => {
        this.places = places || [];
        this.readySubject.next(true);
      });
  }

  private savePlaces() {
    return this.storage.set('places', this.places);
  }

  add(title: string, description: string, location: Location, imageUrl: string) {
    const place = new Place(title, description, location, imageUrl);
    this.places.push(place);
    return this.savePlaces()
      .catch(error => {
        console.warn(error);
        this.places.splice(this.places.indexOf(place), 1);
      });
  }

  getAll(): Promise<Place[]> {
    return new Promise(resolve => {
      const subscription = this.readySubject.subscribe(() => {
        resolve([].concat(this.places));
        subscription.unsubscribe();
      });
    });
  }

  private deleteFile(place: Place) {
    const currentName = place.imageUrl.replace(/^.*[\\\/]/, '');
    this.file.removeFile(this.file.dataDirectory, currentName)
      .then(() => console.log(`File ${place.imageUrl} removed successfully.`))
      .catch(error => {
        console.warn(error);
        return this.add(place.title, place.description, place.location, place.imageUrl);
      });
  }

  deletePlace(index: number) {
    const place = this.places.splice(index, 1);
    this.savePlaces()
      .then(() => {
        return this.deleteFile(place[0]);
      })
      .catch(error => {
        console.warn(error);
        this.places.splice(index, 0, ...place);
      });
  }
}
