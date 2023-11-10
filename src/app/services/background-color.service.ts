import { Injectable } from '@angular/core';
import { EventType, Router } from '@angular/router';

export type BackgroundColorTone = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class BackgroundColorService {
  private _bodyElement = document.getElementsByTagName('body')[0];
  private _metaThemeColorElement = document.getElementsByName('theme-color')[0];
  private _tone: BackgroundColorTone = 'dark';
  private _defaultThemeColor =
    this._metaThemeColorElement.getAttribute('content');

  public changeThemeColor = false;

  constructor(private router: Router) {
    this.router.events.subscribe({
      next: (event) => {
        if (event.type === EventType.NavigationStart) {
          this.unset();
        }
      },
    });
  }

  public get isLight() {
    return this._tone === 'light';
  }

  public get isDark() {
    return this._tone === 'dark';
  }

  public set(color: string, tone?: BackgroundColorTone) {
    this._bodyElement.style.background = color;
    if (this.changeThemeColor) {
      this._metaThemeColorElement.setAttribute('content', color);
    }
    if (tone) {
      this._tone = tone;
    }
  }

  public unset() {
    this._bodyElement.style.backgroundColor = '';
    this._metaThemeColorElement.setAttribute(
      'content',
      this._defaultThemeColor || ''
    );
    this._tone = 'dark';
  }
}
