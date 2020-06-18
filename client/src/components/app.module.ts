import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LaddaModule } from 'angular2-ladda';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { P711Component } from './711/711.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShopComponent } from './shop/shop.component';
import { LoginClient } from 'src/clients';
import { HttpClientModule } from '@angular/common/http';
import { DataTableModule } from 'angular2-datatable';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    P711Component,
    ShopComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    LaddaModule,
    ButtonsModule,
    DataTableModule,
    TooltipModule.forRoot(),
  ],
  providers: [
    LoginClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
