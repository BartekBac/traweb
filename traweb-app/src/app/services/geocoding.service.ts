import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coordinates } from '../models/Coordinates';
import { City } from '../models/City';
import { map } from 'rxjs/internal/operators';
import { Constants } from '../shared/constants/Constants';

class AddressRaw {
  cafe: string;
  road: string;
  suburb: string;
  city: string;
  county: string;
  region: string;
  state: string;
  postcode: string;
  country: string;
  country_code: string;
}

class ResponseRaw {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  lat: string;
  lon: string;
  display_name: string;
  address: AddressRaw;
  boundingbox: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  /**
   * LocationIQ
   * email: gikove6391@izzum.com
   * name: TW
   * token: pk.6b0403dc984486ee66e3bbac915df70e
   *
   * my home
   * lat: 50.1399893 lon: 18.8703565626402
   */

  constructor(private http: HttpClient) { }

  search(searchString: string): Observable<Coordinates[]> {
    return this.http.get<any>(
      Constants.LOCATIONIQ_API_URL + 'search.php?' +
      'key=' + Constants.LOCATIONIQ_API_KEY +
      '&q=' + searchString +
      '&accept-language=' + Constants.LANGUAGE_ISO_CODE +
      '&format=json').pipe(
        map(res => {
          const locations: Coordinates[] = [];
          res.forEach((location: { lat: any; lon: any; }) => locations.push({lat: location.lat, lng: location.lon}));
          return locations;
        })
      );
  }

  reverse(latitude: number, longitude: number): Observable<City> {
    return this.http.get<ResponseRaw>(
      Constants.LOCATIONIQ_API_URL + 'reverse.php?' +
      'key=' + Constants.LOCATIONIQ_API_KEY +
      '&lat=' + latitude +
      '&lon=' + longitude +
      '&accept-language=' + Constants.LANGUAGE_ISO_CODE +
      '&format=json').pipe(
        map(res => {
          const city: City = {
            name: res.address.city ?? res.address.county ?? res.address.state,
            countryCode: res.address.country_code,
            lat: +res.lat,
            lng: +res.lon
          };
          return city;
        })
      );
  }
}
