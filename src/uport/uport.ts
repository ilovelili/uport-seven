import { uport } from "./connect";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// doc
// https://github.com/uport-project/uport-connect/blob/develop/docs/reference/index.md#Connect+sendVerification

// The request id to manage uport disclosure requests
const DISCLOSURE_REQUEST = "@uport/DISCLOSURE_REQUEST";
const SEND_VERIFICATION_REQUEST = "@uport/SEND_VERIFICATION_REQUEST";
const DISCLOSURE_RECEIVED = '@uport/DISCLOSURE_RECEIVED'
const SEND_VERIFICATION_RECEIVED = "@uport/SEND_VERIFICATION_RECEIVED";

@Injectable({
  providedIn: 'root'
})
export class UportService {
  constructor(private router: Router) {
    uport.onResponse(DISCLOSURE_REQUEST).then(res => {
      // uport.setState(res.payload);
      this.router.navigate(["register"]);
    });

    uport.onResponse(SEND_VERIFICATION_REQUEST).then((credential) => {
      console.log(credential);
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

  async sendVerification(expInSeconds: number, claim: Object) {
    uport.sendVerification({
      exp: Math.floor(new Date().getTime() / 1000) + expInSeconds,
      claim: { "Persol ID": claim },
    }, SEND_VERIFICATION_REQUEST)
  }

  loadState() {
    return uport.loadState();
  }

  get state() {
    return uport.state;
  }
}


