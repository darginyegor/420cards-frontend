import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_HOST } from '../app.consts';

export interface ConnectionRequestBody {
  name: string;
  emoji: string;
  backgroundColor: string;
}

export interface ConnectionResponse {
  host: string;
  playerToken: string;
  lobbyToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_HOST = API_HOST;

  constructor(private httpClient: HttpClient) {}

  public getConnectionInfo(body: ConnectionRequestBody, token?: string | null) {
    let params = new HttpParams();
    if (token) {
      params = params.set('lobbyToken', token);
    }

    return this.httpClient.post<ConnectionResponse>(this.API_HOST, body, {
      params,
    });
  }
}
