import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { MessageService } from 'primeng/api';
import { map, filter, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

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
    userToUpdate.friends = userToUpdate.friends.length > 0 ? userToUpdate.friends + ',' + friend.id : `${friend.id}`;
    console.log(friend);

    // eksperymentalne
    this.friendsToAdd = this.removeItemFromArray(this.friendsToAdd, friend);
    this.yourFriends.push(friend);
    // eksperymentalne
    

    this.userService.updateCurrentUser(userToUpdate).subscribe(
      res => this.toastService.add({severity: 'success', summary: 'You have a new friend!', life: 2000}),
      err => this.toastService.add({severity: 'error', summary: 'Failed to add a friend.', detail: err, life: 20000, closable: true})
    );
  }

  removeItemFromArray(array: any[], item: any) {
    return array.filter(arrayItem => arrayItem != item);
  }

  constructor(private http: HttpClient, private userService: UserService, private toastService: MessageService) { 
    this.yourFriends = [];
    this.friendsToAdd = [];

    const yourFriendsRef = this.yourFriends;
    let friendsToAddRef = this.friendsToAdd;
    //const currentUserRef = this.currentUser;

    this.userService.getCurrentUserSnake().subscribe(res => {
      this.currentUser = res;
      const currentUserRef = this.currentUser;
      console.log(`this.currentUser: ${JSON.stringify(this.currentUser)}`);
      let friends = this.currentUser.friends.length > 0 ? this.currentUser.friends.split(',') : [];
      console.log(`friends: ${friends}`);

      // friends.map(friendID => {
      //   userService.getUser(Number(friendID)).subscribe({
      //     next(user: User) {
      //       yourFriendsRef.push(user);
      //       console.log("pushing to yourFriends...");
      //     },
      //     error(msg) {
      //       console.log(`Error: ${msg}`);
      //     },
      //     complete() {
      //       userService.getAllUsers().subscribe(users => {
      //         friendsToAddRef = users.filter(user => {
      //           console.log("filtering for friendsToAdd...");
      //           return user.id !== 
      //               currentUserRef.id 
      //               && yourFriendsRef.map(friend => friend.id === user.id).length === 0 // eksperymentalne
      //         });
      //       });
      //     }
      //   });
      // });


      // friends.map(friendID => {
      //   userService.getUser(Number(friendID)).subscribe(
      //     (user: User) => {
      //       this.yourFriends.push(user);
      //       console.log("pushing to yourFriends...");
      //     },
      //     (msg) => {
      //       console.log(`Error: ${msg}`);
      //     },
      //     () => {
      //       userService.getAllUsers().subscribe(users => {
      //         console.log(`all users: ${JSON.stringify(users)}`);
      //         this.friendsToAdd = users.filter(user => {
      //           console.log("filtering for friendsToAdd...");
      //           return user.id !== 
      //               this.currentUser.id 
      //               && this.yourFriends.map(friend => friend.id === user.id).length === 0 // eksperymentalne
      //         });
      //       });
      //     }
      //   );
      // });

      // friends.map(friendID => {
      //   userService.getUser(Number(friendID)).subscribe(res => this.yourFriends.push(res));
      // }).subscribe()

      // friends to tablica intów, np. [2,3]
      // dla każdego inta chcę zrobić getUser i pushnąć tego usera do this.yourFriends
      // potem, już jak przejdę całą tą tablicę, to chcę zrobić request getAllUsers
      // i wszystkich userów przefiltrować tak, żeby odrzucić CurrentUsera i wszystkich z this.yourFriends

      var fromFriends = from(friends);
      fromFriends.pipe(switchMap(async (friendID) => userService.getUser(Number(friendID)).subscribe(res => {
          console.log(`Pushing to yourFriends...`);
          this.yourFriends.push(res);
        })))

        .subscribe(() => {}, () => {}, () => {
          userService.getAllUsers().subscribe(users => {
            console.log(`all users: ${JSON.stringify(users)}`);
            this.friendsToAdd = users.filter(user => {
              console.log("filtering for friendsToAdd...");
              return user.id !== 
                  this.currentUser.id 
                  && this.yourFriends.map(friend => friend.id === user.id).length === 0 // eksperymentalne
            });
          });
        })


    });
  }

  ngOnInit(): void {
  }
}
