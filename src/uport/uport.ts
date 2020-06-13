import { uport } from "./connect";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// The request id to manage uport disclosure requests
const DISCLOSURE_REQUEST = "DISCLOSURE_REQUEST";
const DISCLOSURE_RECEIVED = '@uport/DISCLOSURE_RECEIVED'

@Injectable({
  providedIn: 'root'
})
export class UportService {
  constructor(private router: Router) {
    uport.onResponse(DISCLOSURE_REQUEST).then(res => {
      localStorage.setItem(DISCLOSURE_RECEIVED, JSON.stringify(res.payload));
      this.router.navigate(["dashboard"]);
    });
  }

  async requestDisclosure({ requested = ["name"], verified = [] }) {
    uport.requestDisclosure(
      {
        requested,
        verified,
        notifications: true,
      },
      DISCLOSURE_REQUEST
    );
  }
}


