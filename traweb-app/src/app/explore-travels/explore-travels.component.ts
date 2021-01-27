import { Component, OnInit } from '@angular/core';
import { TravelService } from 'src/app/services/travel.service';
import { Travel } from '../models/Travel';
import { TravelPositionTypePipe } from '../pipes/travel-position-type.pipe';

@Component({
  selector: 'app-explore-travels',
  templateUrl: './explore-travels.component.html',
  styleUrls: ['./explore-travels.component.css']
})
export class ExploreTravelsComponent implements OnInit {
  travels: Travel[];
  constructor(
    private travelService: TravelService
  ) {}

  ngOnInit(): void {
    this.travels = this.travelService.getCurrentUserTravels();
  }

}
