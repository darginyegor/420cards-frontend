import { Injectable } from '@angular/core';

export const STORE_KEYS = [
  'PLAYER_AVATAR_ID',
  'PLAYER_NAME',
  'LOBBY_HOST_CACHED',
  'LOBBY_TOKEN_CACHED',
  'PLAYER_TOKEN_CACHED',
  'LOGS',
  'LAST_VERSION',
] as const;

export type StoreKey = (typeof STORE_KEYS)[number];
export type StoreItems = [StoreKey, any][];

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() {}

  public get(key: StoreKey) {
    return localStorage.getItem(key);
  }

  public set(key: StoreKey, value: any) {
    localStorage.setItem(key, String(value));
  }

  public clear(key: StoreKey) {
    localStorage.removeItem(key);
  }

  public setMany(items: StoreItems) {
    items.forEach(([key, value]) => this.set(key, value));
  }

  public clearMany(keys: StoreKey[]) {
    keys.forEach((key) => this.clear(key));
  }

  public clearAll() {
    localStorage.clear();
  }
}
