import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { NgSimpleSidebarService, SimpleSidebarPosition, SimpleSidebarItem, SimpleSidebarConfiguration } from 'ng-simple-sidebar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'traweb-app';
  sidebarItems: SimpleSidebarItem[] = [
    {
        name: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/home'],
        position: SimpleSidebarPosition.top,
    },
    {
      name: 'Travel creator',
      icon: 'pi pi-plus-circle',
      routerLink: ['/my-travels/add'],
      position: SimpleSidebarPosition.top
    },
    {
        name: 'Explore travels',
        icon: 'pi pi-compass',
        routerLink: ['/travels'],
        position: SimpleSidebarPosition.top
    },
    {
      name: 'My travels',
      icon: 'pi pi-map',
      routerLink: ['/my-travels'],
      position: SimpleSidebarPosition.top
    },
    {
      name: 'Friends',
      icon: 'pi pi-users',
      routerLink: ['/friends'],
      position: SimpleSidebarPosition.top
    },
    {
        name: 'Logout',
        icon: 'pi pi-power-off',
        routerLink: ['/login'],

        position: SimpleSidebarPosition.bottom
    }
  ];

  sidebarConfiguration: SimpleSidebarConfiguration = {
    openIcon: 'pi pi-bars',
    closeIcon: 'pi pi-times',
  };

  constructor(
    private authService: AuthService,
    private sidebarService: NgSimpleSidebarService
  ) {}

  ngOnInit(): void {
    this.sidebarService.addItems(this.sidebarItems);
    this.sidebarService.configure(this.sidebarConfiguration);
  }

  showSidebar(): boolean {
    return this.authService.isAuthenticated();
  }
}
