import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseClient } from './base.client';
import { environment } from 'src/environments/environment';
import { Info } from 'src/model/info';

@Injectable()
export class LoginClient extends BaseClient {
  constructor(protected http: HttpClient) {
    super(http);
  }

  login(): Observable<string> {
    return this.http.get<string>(environment.api.baseURI + '/verify', { headers: this.defaultHeaders });
  };

  info(): Observable<Info[]> {
    return this.http.get<Info[]>(environment.api.baseURI + '/info', { headers: this.defaultHeaders });
  }
}
