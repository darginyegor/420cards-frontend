import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProfileAvatar } from '../interfaces/profile-avatar';
import { PROFILE_AVATARS } from '../mocks';

@Injectable({
  providedIn: 'root',
})
export class PlayerProfileService {
  private readonly avatarIdStoreKey = 'PLAYER_AVATAR_ID';
  private readonly nameStoreKey = 'PLAYER_NAME';
  private _avatar$: BehaviorSubject<ProfileAvatar>;
  public avatar$: Observable<ProfileAvatar>;
  private _currentIndex;

  private _name: string;

  public readonly avatarsGallery = PROFILE_AVATARS;

  constructor() {
    const avatarFromStore = localStorage.getItem(this.avatarIdStoreKey);
    let currentAvatarIndex = this.avatarsGallery.findIndex(
      (avatar) => avatar.emoji === avatarFromStore
    );
    if (currentAvatarIndex < 0) {
      currentAvatarIndex = 0;
    }
    const currentAvatar = this.avatarsGallery[currentAvatarIndex];
    this._avatar$ = new BehaviorSubject(currentAvatar);
    this.avatar$ = this._avatar$.asObservable();
    this._currentIndex = currentAvatarIndex;

    this._name = localStorage.getItem(this.nameStoreKey) || '';
  }

  public get name() {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
    localStorage.setItem(this.nameStoreKey, name);
  }

  public get avatar() {
    return this._avatar$.value;
  }

  public selectNext(): void {
    this._currentIndex++;
    if (this._currentIndex >= this.avatarsGallery.length) {
      this._currentIndex = 0;
    }
    this.select(this.avatarsGallery[this._currentIndex]);
  }

  public selectPrev(): void {
    this._currentIndex--;
    if (this._currentIndex < 0) {
      this._currentIndex = PROFILE_AVATARS.length - 1;
    }
    this.select(this.avatarsGallery[this._currentIndex]);
  }

  private select(avatar: ProfileAvatar): void {
    this._avatar$.next(avatar);
    localStorage.setItem(this.avatarIdStoreKey, avatar.emoji);
  }
}
