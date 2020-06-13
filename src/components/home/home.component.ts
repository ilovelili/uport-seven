import { Component, NgZone } from '@angular/core';
import { UportService } from 'src/uport/uport';
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'Persol DID Platform';
  constructor(private uport: UportService) { }

  clicked = false;
  login() {
    this.clicked = true;
    this.uport.requestDisclosure({ requested: ["name", "country", "email", "avatar", "phone"] });
  }
}