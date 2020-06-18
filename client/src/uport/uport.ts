import { uport } from "./connect";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// doc
// https://github.com/uport-project/uport-connect/blob/develop/docs/reference/index.md#Connect+sendVerification
// https://github.com/uport-project/uport-connect/issues/268

// The request id to manage uport disclosure requests
export const LOGIN_DISCLOSURE_REQUEST = "@uport/LOGIN_DISCLOSURE_REQUEST";
export const PERSOLID_DISCLOSURE_REQUEST = "@uport/PERSOLID_DISCLOSURE_REQUEST";
export const SEVEN_DISCLOSURE_REQUEST = "@uport/SEVEN_DISCLOSURE_REQUEST";
export const SEND_VERIFICATION_REQUEST = "@uport/SEND_VERIFICATION_REQUEST";
export const DISCLOSURE_RECEIVED = '@uport/DISCLOSURE_RECEIVED'
export const SEND_VERIFICATION_RECEIVED = "@uport/SEND_VERIFICATION_RECEIVED";

@Injectable({
  providedIn: 'root'
})
export class UportService {
  constructor(private router: Router) {
    uport.onResponse(LOGIN_DISCLOSURE_REQUEST).then(res => {
      // uport.setState(res.payload);      
      // this.router.navigateByUrl("/register");
      console.log(res);
      window.location.href = `${window.location.origin}/register`;
    });

    uport.onResponse(PERSOLID_DISCLOSURE_REQUEST).then(res => {
      console.log(res);
      window.location.href = `${window.location.origin}/711`;
    });

    uport.onResponse(SEND_VERIFICATION_REQUEST).then((res) => {
      console.log(res);
    });

    uport.onResponse(SEVEN_DISCLOSURE_REQUEST).then(res => {
      console.log(res);
      window.location.href = `${window.location.origin}/shop`;
    });
  }

  async requestDisclosure({ requested = ["name"], verified = [] }, requestId: string) {
    uport.requestDisclosure(
      {
        requested,
        verified,
        notifications: true,
      },
      requestId
    );
  }

  async sendVerification(key: string, expInSeconds: number, claim: Object) {
    let c = {};
    c[key] = claim;

    uport.sendVerification({
      exp: Math.floor(new Date().getTime() / 1000) + expInSeconds,
      claim: c,
    }, SEND_VERIFICATION_REQUEST)
  }

  loadState() {
    return uport.loadState();
  }

  get state() {
    return uport.state;
  }
}


