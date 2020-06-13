import { Component } from '@angular/core';
import { UportService } from 'src/uport';
@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent {
  name = "";
  email = "";
  title = 'Persol DID Platform';

  constructor(private uport: UportService) { }

  clicked = false;
  login() {
    this.clicked = true;
    this.uport.requestDisclosure({ requested: ["name", "country", "email", "avatar", "phone"] });
  }
}