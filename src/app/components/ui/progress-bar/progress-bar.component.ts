import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent {
  @Input() public value: number | null = 0;
  @Input() public maxValue = 0;

  public get fraction() {
    if (!this.value || !this.maxValue) {
      return 0;
    }
    return this.value / this.maxValue;
  }

  public get transformProperty() {
    return `scaleX(${this.fraction})`;
  }
}
