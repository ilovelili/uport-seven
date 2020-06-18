import { HttpClient, HttpHeaders } from '@angular/common/http';

export abstract class BaseClient {
  constructor(protected http: HttpClient) { }

  get defaultHeaders() {
    let headers = {
      'Content-Type': 'application/json',
    };
    return new HttpHeaders(headers);
  }

  get defaultHttpOptions() {
    return {
      headers: this.defaultHeaders,
    };
  }
}