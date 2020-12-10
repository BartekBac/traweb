import { Injectable } from '@angular/core';

import * as countries_data from '../../assets/dictionares/countries.json';
import { Country } from '../models/Country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private allCountries: Country[];

  constructor() {
    this.allCountries = countries_data.countries.map<Country>(c => {
      const mappedCountry: Country = {
        name: c.name_en,
        code: c.code
       };
      return mappedCountry;
    });
  }

  getAllCountries(): Country[] {
    return this.allCountries;
  }

}
