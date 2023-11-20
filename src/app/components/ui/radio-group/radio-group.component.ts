import { Component, Input, TemplateRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface RadioGroupOption {
  content: string | TemplateRef<any>;
  value: any;
  disabled?: boolean;
}

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  host: {
    class: 'l-row-m',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
})
export class RadioGroupComponent implements ControlValueAccessor {
  @Input() options: RadioGroupOption[] = [];

  private _value: any;
  public get value() {
    return this._value;
  }

  private onChange: (value: any) => void = () => {};

  onTouch: () => void = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: any): void {
    this._value = value;
  }

  select(value: any): void {
    if (this._value === value) {
      return;
    }
    this._value = value;
    this.onChange(value);
    this.onTouch();
  }
}
