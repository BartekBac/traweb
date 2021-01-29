import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTravelComponent } from './add-travel/add-travel.component';
import { ExploreTravelsComponent } from './explore-travels/explore-travels.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FriendsComponent } from './friends/friends.component';
import { HomeComponent } from './home/home.component';
import { CurrentUserResolver } from './resolvers/current-user.resolver';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, resolve: {currentUser: CurrentUserResolver}},
  {path: 'my-travels/add', component: AddTravelComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'my-travels', component: ExploreTravelsComponent, resolve: {currentUser: CurrentUserResolver}, data : {my : true}},
  {path: 'travels', component: ExploreTravelsComponent, resolve: {currentUser: CurrentUserResolver}, data : {my : false}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
