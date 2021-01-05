import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { TravelPositionType } from '../enums/TravelPositionType';
import { Coordinates } from '../models/Coordinates';
import { MapMarker } from '../models/MapMarker';
import { Travel } from '../models/Travel';
import { TravelPosition } from '../models/TravelPosition';
import { TravelPositionTypePipe } from '../pipes/travel-position-type.pipe';
import { Constants } from '../shared/constants/Constants';
import { Functions } from '../shared/constants/Functions';

@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.component.html',
  styleUrls: ['./add-travel.component.css']
})
export class AddTravelComponent implements OnInit {

  travel: Travel = {
    name: '',
    beginDate: undefined,
    endDate: undefined,
    travelPositions: [],
    opinions: [],
    countries: [],
    cities: []
  };

  addPosition: TravelPosition = {coordinates: {lat: 0, lng: 0}, name: 'add-new', type: 0, rating: 0};

  travelPositions: TravelPosition[] = [this.addPosition];
  travelPositionTypes: SelectItem[];

  constructor() {}

  ngOnInit(): void {
    this.travelPositionTypes = this.getTravelPosiotionTypes();
  }

  getCarouselPageItemsCount(maxPageItems: number = 3): number {
    return this.travelPositions.length > maxPageItems ? maxPageItems : this.travelPositions.length;
  }

  getTravelPosiotionTypes(): SelectItem[] {
    const travelPositionPipe = new TravelPositionTypePipe();
    return [
      {value: TravelPositionType.AccommodationPlace, label: travelPositionPipe.transform(TravelPositionType.AccommodationPlace, 'name')},
      {value: TravelPositionType.DiningPlace, label: travelPositionPipe.transform(TravelPositionType.DiningPlace, 'name')},
      {value: TravelPositionType.TouristAttraction, label: travelPositionPipe.transform(TravelPositionType.TouristAttraction, 'name')},
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
    let realTravelPositions = this.travelPositions.filter(tp => tp.name !== this.addPosition.name);
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
        onClickFunction: () => {}
      };
      return marker;
    });
  }

  onImageUpload(imageSource: any, travelPosition: TravelPosition): void {
    travelPosition.mainImage = imageSource;
  }

  addTravelPosition(): void {
    const newTravelPosition: TravelPosition = {
      coordinates: this.getNewTravelPositionLocation(),
      name: 'Position ' + +this.travelPositions.length,
      type: TravelPositionType.AccommodationPlace,
      rating: 4
    };
    this.travelPositions.pop(); // pop addPosition
    this.travelPositions.push(newTravelPosition);
    this.travelPositions.push(this.addPosition);
  }

}
