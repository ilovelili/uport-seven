import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { P711Component } from './711/711.component';
import { RegisterComponent } from './register/register.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '711',
    component: P711Component,
  },
  {
    path: 'shop',
    component: ShopComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
