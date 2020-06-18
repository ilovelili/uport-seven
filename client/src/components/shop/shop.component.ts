import { Component, OnInit } from '@angular/core';
import { SEVEN_DISCLOSURE_REQUEST } from 'src/uport';
import { LoginClient } from 'src/clients';
import { DomSanitizer } from '@angular/platform-browser';
import { Info, SevenEleven } from 'src/model/info';

@Component({
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {
  qr = "";
  info: Info[];

  constructor(
    private loginClient: LoginClient,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.loginClient.login().subscribe(
      (res: any) => { this.qr = res.qr; },
      (err) => { console.error(err); }
    )

    this.loginClient.info().subscribe(
      (res: any) => {
        this.info = res.results.map(i => new Info(
          i.did,
          new SevenEleven(
            i.SevenEleven.name,
            i.SevenEleven.email,
            i.SevenEleven.persolId,
            i.SevenEleven.reservedTime,
            i.SevenEleven.reservedShop,
          ),
          i.vc,
        ));
      }
    );
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
