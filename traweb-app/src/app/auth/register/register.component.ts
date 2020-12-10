import { Component, OnInit } from '@angular/core';

import { Country } from 'src/app/models/Country';
import { City } from 'src/app/models/City';
import { CitiesService } from 'src/app/services/cities.service';
import { CountriesService } from 'src/app/services/countries.service';
import { ValidationStep } from 'src/app/shared/components/input-with-validator/ValidationStep';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  countries: Country[];
  cities: City[];
  zipCodes: string[];
  selectedCountry: Country;
  selectedCity: City;
  selectedZipCode: string;

  emailValidationSteps: ValidationStep[] = [
    {
      condition: (property) =>
        !property.includes('@') || !property.includes('.'),
      comment: 'E-mail not valid.',
    },
  ];

  passwordValidationSteps: ValidationStep[] = [
    {
      condition: (property) => !this.hasLowerCase(property),
      comment: 'Password should contain lowercase.',
    },
    {
      condition: (property) => !this.hasUpperCase(property),
      comment: 'Password should contain uppercase.',
    },
    {
      condition: (property) => !this.hasSpecialCharacter(property),
      comment: 'Password should contain special character.',
    },
  ];

  confirmPasswordValidationSteps: ValidationStep[] = [
    {
      condition: (property) => this.password !== property,
      comment: 'Confirm password does not match password.',
    },
  ];

  firstNameValidationSteps: ValidationStep[] = [
    {
      condition: (property) => property.length === 0,
      comment: 'First name is required.',
    },
  ];

  lastNameValidationSteps: ValidationStep[] = [
    {
      condition: (property) => property.length === 0,
      comment: 'Last name is required.',
    },
  ];

  constructor(
    private countriesService: CountriesService,
    private citiesService: CitiesService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.countries = this.countriesService.getAllCountries();
    this.selectCountry(this.countries[0]);
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.firstName = '';
    this.lastName = '';
  }

  selectCountry(country: Country): void {
    this.cities = this.citiesService.getCountryCities(country.code);
    this.selectCity(this.cities[0]);
    this.selectedCountry = country;
  }

  selectCity(city: City): void {
    this.citiesService.getCityZipCodes(city).subscribe(
      (res) => (this.zipCodes = res),
      (err) => console.log(err),
      () => this.selectZipCode(this.zipCodes[0])
    );
    this.selectedCity = city;
  }

  getCityCords(city: City): string {
    return 'lat:[' + city.lat + ']' + '\nlng:[' + city.lng + ']';
  }

  selectZipCode(zipCode: string): void {
    this.selectedZipCode = zipCode;
  }

  private hasLowerCase(str: string): boolean {
    return str.toUpperCase() !== str;
  }

  private hasUpperCase(str: string): boolean {
    return str.toLowerCase() !== str;
  }

  private hasSpecialCharacter(str: string): boolean {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(str);
  }

  private getValidationComments(
    property: string,
    validationSteps: ValidationStep[]
  ): string {
    let validationSummary = '';
    for (const validationStep of validationSteps) {
      if (validationStep.condition(property)) {
        validationSummary += validationStep.comment + ' ';
      }
    }
    return validationSummary;
  }

  onSubmit(): void {
    let validationSummary = '';
    validationSummary += this.getValidationComments(
      this.email,
      this.emailValidationSteps
    );
    validationSummary += this.getValidationComments(
      this.password,
      this.passwordValidationSteps
    );
    validationSummary += this.getValidationComments(
      this.confirmPassword,
      this.confirmPasswordValidationSteps
    );
    validationSummary += this.getValidationComments(
      this.firstName,
      this.firstNameValidationSteps
    );
    validationSummary += this.getValidationComments(
      this.lastName,
      this.lastNameValidationSteps
    );
    if (validationSummary.length > 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation failed',
        detail: validationSummary,
        life: 12000,
        closable: true
      });
    }
  }

  redirectLogin(): void {
    this.router.navigate(['/login']);
  }
}
