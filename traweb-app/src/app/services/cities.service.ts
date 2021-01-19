import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import cities_data from 'cities.json';
import { City } from '../models/City';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/internal/operators';

class CityRaw {
  country: string;
  name: string;
  lat: string;
  lng: string;
}

class ZipCodeRaw {
  lat: number;
  lng: number;
  countryCode: string;
  postalCode: string;
  placeName: string;
  distance: string;
  adminCode1: string;
  adminName1: string;
  adminCode2: string;
  adminName2: string;
}

class ZipCodeResponse {
  postalCodes: ZipCodeRaw[];
}

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private readonly ZIP_CODE_API_BASE_URL = 'http://api.geonames.org/findNearbyPostalCodesJSON';
  private readonly ZIP_CODE_API_USER = 'aio90k';
  private citiesRaw: CityRaw[] = cities_data as CityRaw[];

  constructor(private http: HttpClient) { }

  getAllCities(): City[] {
    return this.citiesRaw.map<City>(c => {
      const mappedCity: City = { name: c.name, countryCode: c.country, lat: +c.lat, lng: +c.lng };
      return mappedCity;
    });
  }

  getCountryCities(countryCode: string): City[] {
    return this.getAllCities()
    .filter(c => c.countryCode === countryCode)
    .sort((c1, c2) => {
      if (c1.name > c2.name) { return 1; }
      else if (c1.name < c2.name) { return -1; }
      else { return 0; }
    });
  }

  getCityZipCodes(city: City): Observable<string[]> {
    return this.http.get<ZipCodeResponse>(
      this.ZIP_CODE_API_BASE_URL +
      '?username=' + this.ZIP_CODE_API_USER +
      '&lat=' + city.lat +
      '&lng=' + city.lng +
      '&country=' + city.countryCode
      ).pipe(
        map(res => {
          const filteredZipCodes = res.postalCodes
            .filter(pc => pc.placeName === city.name);
          if (filteredZipCodes.length > 0) {
            return filteredZipCodes.map(pc => pc.postalCode);
          } else {
            return res.postalCodes.map(pc => pc.postalCode);
          }
        })
      );
  }
}
