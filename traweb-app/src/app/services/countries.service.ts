import { Injectable } from '@angular/core';
import { Country } from '../models/Country';

// @ts-ignore
import { countries } from 'country-code-lookup';

class CountryRaw {
  continent: string;
  region: string;
  country: string;
  capital: string;
  fips: string;
  iso2: string;
  iso3: string;
  isoNo: string;
  internet: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private allCountries: Country[];

  constructor() {
    const countriesData = countries as CountryRaw[];
    this.allCountries = countriesData.map<Country>(c => {
      const mappedCountry: Country = {
        name: c.country,
        code: c.iso2
       };
      return mappedCountry;
    });
  }

  getAllCountries(): Country[] {
    return this.allCountries.sort((c1, c2) => {
      if (c1.name > c2.name) { return 1; }
      else if (c1.name < c2.name) { return -1; }
      else { return 0; }
    });
  }

}
