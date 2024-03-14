import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private _overlayElement: HTMLElement | null =
    document.querySelector('.overlay');
  private _bodyElement: HTMLElement | null = document.querySelector('body');
  private _isOpen = false;
  private _openOverlayClassName = 'overlay--open';

  constructor() {}

  public open(clickCallback?: () => any) {
    if (this._isOpen || !this._overlayElement) {
      return;
    }
    console.log('opening overlay');

    this._isOpen = true;
    this._overlayElement?.classList.add(this._openOverlayClassName);
    this._bodyElement?.classList.add('--no-scroll');

    if (clickCallback) {
      console.log('opening overlay');

      this._overlayElement.onclick = clickCallback;
    }
  }

  public close() {
    if (!this._isOpen || !this._overlayElement) {
      return;
    }
    console.log('closing');
    console.trace();
    this._isOpen = false;
    this._overlayElement?.classList.remove(this._openOverlayClassName);
    this._bodyElement?.classList.remove('--no-scroll');

    this._overlayElement.onclick = null;
  }
}
