import { Injectable } from '@angular/core';

export const STORE_KEYS = [
  'PLAYER_AVATAR_ID',
  'PLAYER_NAME',
  'LOBBY_HOST_CACHED',
  'LOBBY_TOKEN_CACHED',
  'PLAYER_TOKEN_CACHED',
] as const;

export type StoreKey = (typeof STORE_KEYS)[number];
export type StoreItems = {
  [key in StoreKey]?: any;
};

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

  public setMany(items: StoreItems) {
    Object.entries(items).forEach(([key, value]) =>
      localStorage.setItem(key, String(value))
    );
  }
}
