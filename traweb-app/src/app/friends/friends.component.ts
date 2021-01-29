import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
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
    let userToUpdate = this.currentUser;
    userToUpdate.friends = userToUpdate.friends.length > 0 ? userToUpdate.friends + ',' + friend.id : `${friend.id}`;

    this.friendsToAdd = this.removeItemFromArray(this.friendsToAdd, friend);
    this.yourFriends.push(friend);

    this.userService.updateCurrentUser(userToUpdate).subscribe(
      res => setTimeout(() => this.toastService.add({severity: 'success', summary: 'You have a new friend!', life: 2000}), 1000),
      err => this.toastService.add({severity: 'error', summary: 'Failed to add a friend.', detail: err, life: 20000, closable: true}),
      () => setTimeout(() => this.toastService.add({severity: 'success', summary: 'You have a new friend!', life: 2000}), 1000),
    );
  }

  onRemoveFriend(event: any, friend: User): void {
    let userToUpdate = this.currentUser;
    let IDsTable = userToUpdate.friends.split(',');
    userToUpdate.friends = this.removeItemFromArray(IDsTable, friend.id).join(',');

    this.friendsToAdd.push(friend);
    this.yourFriends = this.removeItemFromArray(this.yourFriends, friend);

    this.userService.updateCurrentUser(userToUpdate).subscribe(
      res => this.toastService.add({severity: 'success', summary: 'You have a new friend!', life: 2000}),
      err => this.toastService.add({severity: 'error', summary: 'Failed to add a friend.', detail: err, life: 20000, closable: true}),
      () => this.toastService.add({severity: 'success', summary: 'You have a new friend!', life: 2000}),
    );
  }

  removeItemFromArray(array: any[], item: any) {
    return array.filter(arrayItem => arrayItem != item);
  }

  constructor(private http: HttpClient, private userService: UserService, private toastService: MessageService) {  }

  ngOnInit(): void {
    this.yourFriends = [];
    this.friendsToAdd = [];

    this.userService.getCurrentUserSnake().subscribe(res => {
      this.currentUser = res;
      let friends = this.currentUser.friends.length > 0 ? this.currentUser.friends.split(',') : [];

      Promise.all(friends.map(friendID => this.userService.getUser(Number(friendID)).toPromise().then(user => this.yourFriends.push(user))))
      .then(() => {
        this.userService.getAllUsers().subscribe(users => {
          let yourFriendsIDs = this.yourFriends.map(friend => friend.id);
          this.friendsToAdd = users.filter(user => user.id !== this.currentUser.id && yourFriendsIDs.indexOf(user.id) === -1);
        });
      })
    });
  }
}
