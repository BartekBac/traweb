import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  yourFriends: User[];
  friendsToAdd: User[];

  onAddFriend(event: any): void {
    console.log("Adding a friend...");
  }

  constructor() { 
    this.yourFriends = [
      {
        firstName: "Jakub",
        lastName: "Łyko",
        city: "Gliwice",
        country: "Poland",
        dateJoined: new Date(),
        email: "",
        id: 0,
        lastLogin: new Date(),
        password: "",
        zipCode: ""
      },
      {
        firstName: "Jakub",
        lastName: "Łyko",
        city: "Gliwice",
        country: "Poland",
        dateJoined: new Date(),
        email: "",
        id: 0,
        lastLogin: new Date(),
        password: "",
        zipCode: ""
      },
      {
        firstName: "Jakub",
        lastName: "Łyko",
        city: "Gliwice",
        country: "Poland",
        dateJoined: new Date(),
        email: "",
        id: 0,
        lastLogin: new Date(),
        password: "",
        zipCode: ""
      }
    ];

    this.friendsToAdd = [
      {
        firstName: "Jakub",
        lastName: "Łyko",
        city: "Gliwice",
        country: "Poland",
        dateJoined: new Date(),
        email: "",
        id: 0,
        lastLogin: new Date(),
        password: "",
        zipCode: ""
      },
      {
        firstName: "Jakub",
        lastName: "Łyko",
        city: "Gliwice",
        country: "Poland",
        dateJoined: new Date(),
        email: "",
        id: 0,
        lastLogin: new Date(),
        password: "",
        zipCode: ""
      }
    ];
  }

  ngOnInit(): void {
  }


}
