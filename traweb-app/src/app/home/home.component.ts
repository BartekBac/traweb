import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: MenuItem[] = [
    {label: 'Home'},
  ];

  currentUser: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastService: MessageService
  ) { }

  // @ts-ignore
  ngOnInit(): void {
    this.currentUser = this.route.snapshot.data.currentUser;
  }

}
