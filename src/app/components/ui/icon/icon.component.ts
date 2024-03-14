import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

export const Icons = {
  starWithTale: {
    emoji: '💫',
    color: '#FFE767',
  },
} as const;

export type IconType = keyof typeof Icons;

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() public icon: IconType = 'starWithTale';

  public get emoji() {
    return Icons[this.icon].emoji;
  }

  @HostBinding('style') public get gradient(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `background: radial-gradient(circle closest-side, ${
        Icons[this.icon].color
      }3D 0%, ${Icons[this.icon].color}00 100%);`
    );
  }

  constructor(private readonly sanitizer: DomSanitizer) {}
}
