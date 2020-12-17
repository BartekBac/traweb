import { Component, OnInit } from '@angular/core';
import { TravelPositionType } from '../enums/TravelPositionType';
import { TravelPosition } from '../models/TravelPosition';

@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.component.html',
  styleUrls: ['./add-travel.component.css']
})
export class AddTravelComponent implements OnInit {

  travelPositions: TravelPosition[] = [];

  addPosition: TravelPosition = {lat: 0, lng: 0, name: 'add-new', type: 0};

  travelPositionsView: TravelPosition[] = [this.addPosition];

  reloadCarousel: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  getCarouselPageItemsCount(maxPageItems: number = 3): number {
    return this.travelPositionsView.length > maxPageItems ? maxPageItems : this.travelPositionsView.length;
  }

  addTravelPosition(): void {
    this.reloadCarousel = false;
    const newTravelPosition: TravelPosition = {
        lat: 0, lng: 0, name: 'Position ' + this.travelPositionsView.length, type: 0
    };
    this.travelPositionsView.pop(); // pop addPosition
    this.travelPositions.push(newTravelPosition);
    this.travelPositionsView.push(newTravelPosition);
    this.travelPositionsView.push(this.addPosition);
    console.log(this.travelPositionsView);
    this.reloadCarousel = true;
  }

}
