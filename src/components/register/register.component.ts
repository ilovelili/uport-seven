import { Component, OnInit } from '@angular/core';
import { UportService } from 'src/uport';

@Component({
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  name = "";
  email = "";
  clicked = false;
  state: any = {};

  constructor(private uport: UportService) {
    // this.uport.loadState();
    this.state = this.uport.state;
  }

  ngOnInit() {
    this.name = this.state.name;
    this.email = this.state.email;
  }

  register() {
    this.clicked = true;
    this.uport.sendVerification(60 * 60, {
      name: this.name,
      email: this.email,
      id: Math.ceil(Math.random() * 10000), // random id
    });
  }
}