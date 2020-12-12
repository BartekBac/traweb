import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';

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
import { BodyInterceptor } from './interceptors/body.interceptor';
import { HomeComponent } from './home/home.component';
import { NgSimpleSidebarModule } from 'ng-simple-sidebar';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FlagImagePipe,
    InputWithValidatorComponent,
    HomeComponent
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
    NgSimpleSidebarModule
  ],
  providers: [MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BodyInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
