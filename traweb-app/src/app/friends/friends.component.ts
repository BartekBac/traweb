import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Constants } from '../shared/constants/Constants';
import { UserService } from '../services/user.service';
import { MessageService } from 'primeng/api';


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


    this.userService.updateCurrentUser(userToUpdate).subscribe(
      res => this.toastService.add({severity: 'success', summary: 'You have a new friend!', life: 2000}),
      err => this.toastService.add({severity: 'error', summary: 'Failed to add a friend.', detail: err, life: 20000, closable: true})
    );
  }

  private baseUrl = Constants.TRAWEB_API_BASE_URL + 'users/';

  constructor(private http: HttpClient, private userService: UserService, private toastService: MessageService) { 
    this.yourFriends = [];
    this.friendsToAdd = [];

    this.userService.getCurrentUser().subscribe(res => {
      this.currentUser = res;
      //this.yourFriends = res.friends || [];
      let friends = this.currentUser.friends.length > 0 ?  this.currentUser.friends.split(',') : [];

      friends.map(friendID => {
        userService.getUser(Number(friendID)).subscribe(res => {
          this.yourFriends.push(res);
        })
      })

      userService.getAllUsers().subscribe(res => {
        this.friendsToAdd = res.filter(user => {
          return user.id !== this.currentUser.id && this.yourFriends.map(friend => friend.id === user.id).length === 0 // eksperymentalne
        });
      })



    });

    this.http.get<User[]>(this.baseUrl).subscribe(res => {
      console.log(res);
      this.friendsToAdd = res;
    });
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
  }

  ngOnInit(): void {
  }


}
