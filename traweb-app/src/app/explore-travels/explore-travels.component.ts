import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TravelService } from 'src/app/services/travel.service';
import { CountriesService } from '../services/countries.service';
import { Opinion } from '../models/Opinion';
import { Travel } from '../models/Travel';
import { User } from '../models/User';

@Component({
  selector: 'app-explore-travels',
  templateUrl: './explore-travels.component.html',
  styleUrls: ['./explore-travels.component.css']
})
export class ExploreTravelsComponent implements OnInit {
  travels: Travel[];
  currentUser: User;
  my: boolean;
  sub: any;
  display: boolean;
  opinion: Opinion;
  travelId: number;
  constructor(
    private travelService: TravelService,
    private route: ActivatedRoute,
    private countriesService: CountriesService,
    private toastService: MessageService,
  ) {}

  ngOnInit(): void {
    this.display = false;
    this.opinion = new Opinion();
    this.sub = this.route
      .data
      .subscribe(v => this.my = v.my);
    this.currentUser = this.route.snapshot.data.currentUser;
    if (this.my) {
      this.travelService.getTravels().subscribe(
        res => this.travels = res.filter(travel => (travel.user as User).id === this.currentUser.id)
      );
    }
    else {
      this.travelService.getTravels().subscribe(
        res => this.travels = res.filter(travel => (travel.user as User).id !== this.currentUser.id)
      );
    }
  }

  showAddOpinionDialog(travelId: number): void {
    this.display = true;
    this.travelId = travelId;
  }

  saveOpinion(): void {
    const travel = this.travels.filter(t => t.id === this.travelId)[0];
    travel.opinions?.push(this.opinion);
    travel.user = (travel.user as User).id;
    this.travelService.updateTravel(travel).subscribe(
      res => {
        this.toastService.add({severity: 'success', summary: 'Opinion save succeeded', life: 2000, detail: res.name});
      },
      err => this.toastService.add({severity: 'error', summary: 'Opinion save failed', detail: err, life: 20000, closable: true})
    );
    this.display = false;
    this.opinion = new Opinion();
  }

  getCountryName(countryCode: string): string {
    return this.countriesService.getCountry(countryCode)?.name ?? '';
  }

  getUser(user: User | number | undefined): User {
    return user as User;
  }
}
