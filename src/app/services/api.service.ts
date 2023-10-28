import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_HOST = '';

  constructor(private httpClient: HttpClient) {}

  public getConnectionInfo(token: string) {
    this.httpClient.get(this.API_HOST, {
      params: {
        token,
      },
    });
  }
}
