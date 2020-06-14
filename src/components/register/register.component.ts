import { Component, OnInit } from '@angular/core';
import { UportService } from 'src/uport';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  name = "";
  email = "";
  avatar = "";
  clicked = false;
  modalShown = false;
  state: any = {};

  constructor(private uport: UportService, private router: Router) { }

  ngOnInit() {
    this.state = this.uport.state;
    this.name = this.state.name;
    this.email = this.state.email;
    this.avatar = this.state.avatar;

    if (!this.name || !this.email) {
      this.router.navigate(["/"]);
    }
  }

  register() {
    this.clicked = true;
    // send persol ID
    this.uport.sendVerification("Persol ID", 60 * 60, {
      name: this.name,
      email: this.email,
      id: Math.ceil(Math.random() * 10000), // random id
    });
  }
}