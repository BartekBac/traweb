import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Functions } from 'src/app/shared/constants/Functions';
import { UserLogin } from '../models/UserLogin';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = {
    username: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private toastService: MessageService
  ) { }

  ngOnInit(): void {}

  submit(): void {
    this.authService.login(this.userLogin).subscribe(
      res => this.toastService.add({severity: 'success', summary: 'Login succeeded', detail: 'Loading page content...'}),
      err => this.toastService.add({severity: 'error', summary: 'Login failed', detail: err, life: 10000})
    );
  }

  /*logout(): void {
    this.authService.logout().subscribe(
      res => this.toastService.add({severity: 'success', summary: 'Logging out', detail: 'See you soon!'}),
      err => this.toastService.add({severity: 'error', summary: 'Logout failed', detail: err, life: 10000})
    );
  }*/

}
