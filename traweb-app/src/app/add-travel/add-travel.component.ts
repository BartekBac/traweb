import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { TravelPositionType } from '../enums/TravelPositionType';
import { TravelPosition } from '../models/TravelPosition';

@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.component.html',
  styleUrls: ['./add-travel.component.css']
})
export class AddTravelComponent implements OnInit {

  addPosition: TravelPosition = {lat: 0, lng: 0, name: 'add-new', type: 0, rating: 0};

  travelPositions: TravelPosition[] = [this.addPosition];
  travelPositionValues: number[];

  constructor() {}

  ngOnInit(): void {
    this.travelPositionValues = this.getTravelPosiotionValues();
  }

  getCarouselPageItemsCount(maxPageItems: number = 3): number {
    return this.travelPositions.length > maxPageItems ? maxPageItems : this.travelPositions.length;
  }

  getTravelPosiotionValues(): any {
    return Object.keys(TravelPositionType).filter(tpt => parseInt(tpt, 0) >= 0).map(tpt => parseInt(tpt, 0));
  }

  addTravelPosition(): void {
    const newTravelPosition: TravelPosition = {
        lat: 0, lng: 0, name: 'Position ' + this.travelPositions.length, type: 0, rating: 0
    };
    this.travelPositions.pop(); // pop addPosition
    this.travelPositions.push(newTravelPosition);
    this.travelPositions.push(this.addPosition);
  }

}
