import { Component } from '@angular/core';
import { UportService, PERSOLID_DISCLOSURE_REQUEST } from 'src/uport';
@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(private uport: UportService) { }

  clicked = false;
  requestPersolID() {
    this.clicked = true;
    this.uport.requestDisclosure({ requested: ["name", "email", "phone"], verified: ["Persol ID"] }, PERSOLID_DISCLOSURE_REQUEST);
  }
}
