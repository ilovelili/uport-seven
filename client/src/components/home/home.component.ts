import { Component, OnInit } from '@angular/core';
import { UportService, LOGIN_DISCLOSURE_REQUEST } from 'src/uport';
import { Router } from '@angular/router';
import { LoginClient } from 'src/clients';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  state: any = {};
  title = 'Persol DID Platform';

  constructor(
    private uport: UportService,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.state = this.uport.state;
    if (this.state.name && this.state.email) {
      this.router.navigate(["./register"]);
    }
  }

  clicked = false;
  login() {
    this.clicked = true;
    // this.loginClient.login().subscribe(
    //   (res: any) => { this.qr = res.qr },
    //   (err) => { console.error(err) },
    //   () => { this.clicked = false },
    // )

    this.uport.requestDisclosure({ requested: ["name", "country", "email", "avatar", "phone"] }, LOGIN_DISCLOSURE_REQUEST);
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}