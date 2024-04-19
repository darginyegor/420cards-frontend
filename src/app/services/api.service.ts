import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_BASE = '/api';

export const URLS = {
  connect: `${API_BASE}/connect`,
  changelog: `${API_BASE}/changelog`,
} as const;

export interface ConnectionRequestBody {
  name: string;
  emoji: string;
}

export interface ConnectionResponse {
  host: string;
  playerToken: string;
  lobbyToken: string;
}

export interface ChangelogResponse {
  changelog: {
    date: string;
    version: string;
    text: string;
  }[];
  currentVersion: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_HOST = '';

  constructor(private httpClient: HttpClient) {}

  public getConnectionInfo(body: ConnectionRequestBody, token?: string | null) {
    let params = new HttpParams();
    if (token) {
      params = params.set('lobbyToken', token);
    }

    return this.httpClient.post<ConnectionResponse>(URLS.connect, body, {
      params,
    });
  }

  public getChangelog(version?: string) {
    let params = new HttpParams();
    if (version) {
      params = params.set('version', version);
    }

    return this.httpClient.get<ChangelogResponse>(URLS.changelog, { params });
  }
}
