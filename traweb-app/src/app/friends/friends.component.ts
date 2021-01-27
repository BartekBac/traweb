import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Constants } from '../shared/constants/Constants';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  currentUser: User;
  yourFriends: User[];
  friendsToAdd: User[];

  onAddFriend(event: any, friend: User): void {
    console.log("Adding a friend...");

    let userToUpdate = this.currentUser;
    //userToUpdate.friends = 
    console.log(friend);


    // this.userService.updateUser().subscribe(
    //   res => this.toastService.add({severity: 'success', summary: 'Travel update succeeded', life: 2000}),
    //   err => this.toastService.add({severity: 'error', summary: 'Travel update failed', detail: err, life: 20000, closable: true}),
    //   (/*complete*/) => this.travel.positions?.push(this.addPosition)
    // );
  }

  private baseUrl = Constants.TRAWEB_API_BASE_URL + 'users/';

  constructor(private http: HttpClient, private userService: UserService,) { 
    this.yourFriends = [];
    this.friendsToAdd = [];
    // this.yourFriends = [
    //   {
    //     firstName: "Jakub",
    //     lastName: "Łyko",
    //     city: "Gliwice",
    //     country: "Poland",
    //     dateJoined: new Date(),
    //     email: "",
    //     id: 0,
    //     lastLogin: new Date(),
    //     password: "",
    //     zipCode: ""
    //   },
    //   {
    //     firstName: "Jakub",
    //     lastName: "Łyko",
    //     city: "Gliwice",
    //     country: "Poland",
    //     dateJoined: new Date(),
    //     email: "",
    //     id: 0,
    //     lastLogin: new Date(),
    //     password: "",
    //     zipCode: ""
    //   },
    //   {
    //     firstName: "Jakub",
    //     lastName: "Łyko",
    //     city: "Gliwice",
    //     country: "Poland",
    //     dateJoined: new Date(),
    //     email: "",
    //     id: 0,
    //     lastLogin: new Date(),
    //     password: "",
    //     zipCode: ""
    //   }
    // ];

    // this.friendsToAdd = [
    //   {
    //     firstName: "Jakub",
    //     lastName: "Łyko",
    //     city: "Gliwice",
    //     country: "Poland",
    //     dateJoined: new Date(),
    //     email: "",
    //     id: 0,
    //     lastLogin: new Date(),
    //     password: "",
    //     zipCode: ""
    //   },
    //   {
    //     firstName: "Jakub",
    //     lastName: "Łyko",
    //     city: "Gliwice",
    //     country: "Poland",
    //     dateJoined: new Date(),
    //     email: "",
    //     id: 0,
    //     lastLogin: new Date(),
    //     password: "",
    //     zipCode: ""
    //   }
    // ];

    this.userService.getCurrentUser().subscribe(res => {
      this.currentUser = res;
      this.yourFriends = res.friends || [];
    });

    this.http.get<User[]>(this.baseUrl).subscribe(res => {
      console.log(res);
      this.friendsToAdd = res;
    });
  }

  ngOnInit(): void {
  }


}
