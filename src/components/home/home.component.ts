import { Component, OnInit } from '@angular/core';
import { UportService, LOGIN_DISCLOSURE_REQUEST } from 'src/uport';
import { Router } from '@angular/router';
@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  state: any = {};
  title = 'Persol DID Platform';

  constructor(private uport: UportService, private router: Router) { }

  ngOnInit(): void {
    this.state = this.uport.state;
    if (this.state.name && this.state.email) {
      this.router.navigate(["./register"]);
    }
  }

  clicked = false;
  login() {
    this.clicked = true;
    this.uport.requestDisclosure({ requested: ["name", "country", "email", "avatar", "phone"] }, LOGIN_DISCLOSURE_REQUEST);
  }
}