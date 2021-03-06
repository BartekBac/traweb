import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';
import { CarouselModule } from 'primeng/carousel';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { TabViewModule } from 'primeng/tabview';
import { ChipsModule } from 'primeng/chips';
import { CalendarModule } from 'primeng/calendar';
import { GalleriaModule } from 'primeng/galleria';
import { DialogModule } from 'primeng/dialog';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlagImagePipe } from './pipes/flag-image.pipe';
import { InputWithValidatorComponent } from './shared/components/input-with-validator/input-with-validator.component';
import { MessageService } from 'primeng/api';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HomeComponent } from './home/home.component';
import { NgSimpleSidebarModule } from 'ng-simple-sidebar';
import { CurrentUserResolver } from './resolvers/current-user.resolver';
import { AddTravelComponent } from './add-travel/add-travel.component';
import { TravelPositionTypePipe } from './pipes/travel-position-type.pipe';
import { UploadImageComponent } from './shared/components/upload-image/upload-image.component';
import { MapSelectComponent } from './shared/components/map-select/map-select.component';
import { MapViewComponent } from './shared/components/map-view/map-view.component';
import { FriendsComponent } from './friends/friends.component';
import { ExploreTravelsComponent } from './explore-travels/explore-travels.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FlagImagePipe,
    InputWithValidatorComponent,
    HomeComponent,
    AddTravelComponent,
    TravelPositionTypePipe,
    UploadImageComponent,
    MapSelectComponent,
    MapViewComponent,
    FriendsComponent,
    ExploreTravelsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormsModule,
    TooltipModule,
    HttpClientModule,
    ToastModule,
    NgSimpleSidebarModule,
    PanelModule,
    AccordionModule,
    CarouselModule,
    OverlayPanelModule,
    RatingModule,
    InputTextareaModule,
    FileUploadModule,
    TabViewModule,
    ChipsModule,
    CalendarModule,
    GalleriaModule,
    DialogModule,
    ToggleButtonModule
  ],
  providers: [MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    CurrentUserResolver,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
