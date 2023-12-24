import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  animations: [
    trigger('state', [
      state('void, closed', style({ transform: 'translateY(100%)' })),
      state('open', style({ transform: 'translateY(0)' })),
      transition('* => *', [animate('.4s cubic-bezier(.25,.1,.25,1)')]),
    ]),
  ],
})
export class BottomSheetComponent {
  @HostBinding('class.bottom-sheet--open')
  private _isOpen = false;

  @Input()
  public get isOpen() {
    return this._isOpen;
  }
  public set isOpen(value: boolean) {
    if (value) {
      this.open();
    } else {
      this.close();
    }
  }

  public get state() {
    return this.isOpen ? 'open' : 'closed';
  }

  @Input()
  public closeOnClickOutside = true;

  @Input() public bgColor = '';

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly overlay: OverlayService
  ) {}

  public open() {
    this._isOpen = true;
    this.overlay.open(() => {
      this.close();
      this.overlay.close();
    });
    this.changeDetectorRef.detectChanges();
  }

  public close() {
    this._isOpen = false;
    this.overlay.close();
    this.changeDetectorRef.detectChanges();
  }
}
