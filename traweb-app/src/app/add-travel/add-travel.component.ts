import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { TravelPositionType } from '../enums/TravelPositionType';
import { Coordinates } from '../models/Coordinates';
import { MapMarker } from '../models/MapMarker';
import { Travel } from '../models/Travel';
import { TravelPosition } from '../models/TravelPosition';
import { User } from '../models/User';
import { TravelPositionTypePipe } from '../pipes/travel-position-type.pipe';
import { BlobStorageService } from '../services/blob-storage.service';
import { CountriesService } from '../services/countries.service';
import { GeocodingService } from '../services/geocoding.service';
import { TravelService } from '../services/travel.service';
import { UserService } from '../services/user.service';
import { Constants } from '../shared/constants/Constants';
import { Functions } from '../shared/constants/Functions';

@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.component.html',
  styleUrls: ['./add-travel.component.css']
})
export class AddTravelComponent implements OnInit {

  @Input() travel: Travel = {
    id: -1,
    user: undefined,
    name: '',
    beginDate: undefined,
    endDate: undefined,
    countryCodes: [],
    cities: [],
    positions: [],
    opinions: []
  };

  @Input() editMode = true;

  addPosition: TravelPosition = {
    id: -1000,
    coordinates: { lat: 0, lng: 0 },
    name: 'add-new',
    type: 0,
    rating: 0,
    city: '',
    countryCode: '',
    description: '',
    mainImage: '',
    pictures: []
  };

  travelPositions: TravelPosition[] = [];
  selectedTravelPosition: TravelPosition;
  travelPositionTypes: SelectItem[];

  constructor(
    private geocodingService: GeocodingService,
    private countriesService: CountriesService,
    private travelService: TravelService,
    private toastService: MessageService,
    private userService: UserService,
    private datepipe: DatePipe,
    private blobStorageService: BlobStorageService
  ) { }

  ngOnInit(): void {
    this.travelPositionTypes = this.getTravelPosiotionTypes();
    if (this.travel.id === -1) {
      // adding new travel
      this.userService.getCurrentUser().subscribe(
        res => this.travel.user = res.id
      );
    }
    /*this.travelService.getTravel(58).subscribe(
      res => {
        this.setPropertiesFromResponse(res);
      },
      err => console.error(err)
    );*/

    if (this.editMode) {
      this.travelPositions.push(this.addPosition);
    }
  }

  private setPropertiesFromResponse(travel: Travel): void {
    this.travel = travel;
    this.travelPositions = travel.positions ?? [];
    if (this.editMode) { this.travelPositions.push(this.addPosition); }
    this.travel.user = (travel.user as User).id;
  }

  getCarouselPageItemsCount(maxPageItems: number = 3): number {
    return this.travelPositions.length > maxPageItems ? maxPageItems : this.travelPositions.length;
  }

  getTravelPosiotionTypes(): SelectItem[] {
    const travelPositionPipe = new TravelPositionTypePipe();
    return [
      { value: TravelPositionType.AccommodationPlace, label: travelPositionPipe.transform(TravelPositionType.AccommodationPlace, 'name') },
      { value: TravelPositionType.DiningPlace, label: travelPositionPipe.transform(TravelPositionType.DiningPlace, 'name') },
      { value: TravelPositionType.TouristAttraction, label: travelPositionPipe.transform(TravelPositionType.TouristAttraction, 'name') },
    ];
  }

  getUniqueNameInputId(travelPosition: TravelPosition): string {
    return 'id-name-input-' + this.travelPositions.indexOf(travelPosition);
  }

  getUniqueDescriptionInputId(travelPosition: TravelPosition): string {
    return 'id-description-input-' + this.travelPositions.indexOf(travelPosition);
  }

  getLocationButtonLabel(coordinates: Coordinates): string {
    if (Functions.isLocationSet(coordinates)) {
      return '[lat:' + coordinates.lat.toPrecision(4) + '... lng:' + coordinates?.lng.toPrecision(4) + '...]';
    } else {
      return 'Select location';
    }
  }

  private getRealTravelPositions(skipPosition?: TravelPosition): TravelPosition[] {
    let realTravelPositions = this.travelPositions.filter(tp => tp.id !== this.addPosition.id);
    if (skipPosition) {
      realTravelPositions = realTravelPositions.filter(tp => tp !== skipPosition);
    }
    return realTravelPositions;
  }

  private getNewTravelPositionLocation(): Coordinates {
    let coordinates = Constants.LMAP_DEFAULT_COORD;
    const realTravelPositions = this.getRealTravelPositions();
    const travelPositionsCount = realTravelPositions.length;
    if (travelPositionsCount === 1) {
      const outsetRange = 0.01;
      coordinates = {
        lat: realTravelPositions[0].coordinates.lat + outsetRange,
        lng: realTravelPositions[0].coordinates.lng + outsetRange
      };
    } else if (travelPositionsCount > 1) {
      const centerLat = realTravelPositions.map(tp => tp.coordinates.lat).reduce((l1, l2) => l1 + l2) / travelPositionsCount;
      const centerLng = realTravelPositions.map(tp => tp.coordinates.lng).reduce((l1, l2) => l1 + l2) / travelPositionsCount;
      coordinates = {
        lat: centerLat,
        lng: centerLng
      };
    }
    return coordinates;
  }

  getTravelPositionsMarkers(currentTravelPosition: TravelPosition): MapMarker[] {
    return this.getRealTravelPositions(currentTravelPosition).map<MapMarker>((tp) => {
      const marker: MapMarker = {
        lat: tp.coordinates.lat,
        lng: tp.coordinates.lng,
        title: tp.name,
        editable: false,
        onClickFunction: () => { }
      };
      return marker;
    });
  }

  openMap(event: any, op: OverlayPanel, tp: TravelPosition): void {
    this.selectedTravelPosition = tp;
    op.toggle(event);
  }

  private deleteArrayDuplicates(array: any[]): any[] {
    return array.filter((elem, index, self) => {
      return index === self.indexOf(elem);
    });
  }

  updateInvolvedCities(): void {
    this.geocodingService.reverse(this.selectedTravelPosition.coordinates.lat, this.selectedTravelPosition.coordinates.lng)
      .subscribe(
        res => {
          this.selectedTravelPosition.city = res.name;
          this.selectedTravelPosition.countryCode = res.countryCode;
        },
        err => {
          console.error(err);
        },
        (/*complete*/) => {
          this.travel.cities = [];
          this.travel.countryCodes = [];
          this.getRealTravelPositions().forEach(
            tp => {
              this.travel.cities?.push(tp.city ?? '');
              this.travel.countryCodes?.push(tp.countryCode ?? '');
            }
          );

          this.travel.cities = this.deleteArrayDuplicates(this.travel.cities);
          this.travel.countryCodes = this.deleteArrayDuplicates(this.travel.countryCodes);
        }
      );
  }

  getCountryName(countryCode: string): string {
    return this.countriesService.getCountry(countryCode)?.name ?? '';
  }

  setTravelPositionImage(positionId: number, imageUrl: string): void{
    const travelPositionToEdit = this.travelPositions.find(tp => tp.id === positionId);
    if(!!travelPositionToEdit){
      if(!travelPositionToEdit.mainImage || travelPositionToEdit.mainImage === ''){
        travelPositionToEdit.mainImage = imageUrl;
      }
      else{
        travelPositionToEdit.pictures?.push(imageUrl);
      }
    }
  }

  onImageUpload(image: File, travelPosition: TravelPosition): void {
    this.blobStorageService.uploadImage(image).then((url: string) => {
      this.toastService.add({ severity: 'success', summary: 'Image has been uploaded', life: 2000, detail: image.name })
      this.setTravelPositionImage(travelPosition.id, url)
    },
      (err) => {
        this.toastService.add({ severity: 'error', summary: 'Uploading image failed', detail: err, life: 20000, closable: true })
      }
    );
  }

  addTravelPosition(): void {
    const newTravelPosition: TravelPosition = {
      id: -1,
      coordinates: this.getNewTravelPositionLocation(),
      name: 'Position ' + +this.travelPositions.length,
      type: TravelPositionType.AccommodationPlace,
      rating: 4,
      city: '',
      countryCode: '',
      description: '',
      mainImage: '',
      pictures: []
    };
    this.travelPositions.pop(); // pop addPosition
    this.travelPositions.push(newTravelPosition);
    this.travelPositions.push(this.addPosition);
  }

  onSubmit(): void {
    if (this.travel.id === -1) {
      if (typeof this.travel.user !== 'number') {
        this.toastService.add({
          severity: 'warn', summary: 'Cannot save travel', life: 7000, closable: true,
          detail: 'Problem encountered when trying to fetch a user from the server'
        });
      } else {
        // add new travel
        this.travel.positions = this.getRealTravelPositions();
        this.travelService.addTravel(this.travel).subscribe(
          res => {
            this.toastService.add({ severity: 'success', summary: 'Travel save succeeded', life: 2000, detail: res.name });
            this.setPropertiesFromResponse(res);
          },
          err => this.toastService.add({ severity: 'error', summary: 'Travel save failed', detail: err, life: 20000, closable: true })
        );
      }
    } else {
      // update existing travel
      this.travel.positions = this.getRealTravelPositions();
      this.travelService.updateTravel(this.travel).subscribe(
        res => this.toastService.add({ severity: 'success', summary: 'Travel update succeeded', life: 2000 }),
        err => this.toastService.add({ severity: 'error', summary: 'Travel update failed', detail: err, life: 20000, closable: true }),
        (/*complete*/) => this.travel.positions?.push(this.addPosition)
      );
    }
  }

}
