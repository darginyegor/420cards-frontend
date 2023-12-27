import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent {
  @Input() public value: number | null = 0;
  @Input() public maxValue = 0;
  @Input() warningLimit = -5;

  public get fraction() {
    if (!this.value || !this.maxValue) {
      return 0;
    }
    return Math.min(this.value / this.maxValue, 1);
  }

  public get transformProperty() {
    return `scaleX(${this.fraction})`;
  }

  public get opacity() {
    if (!this.isOverLimit || !this.value) {
      return this.fraction;
    } else {
      return Math.min(this.value, this.maxValue) % 2 ? 0.5 : 1;
    }
  }

  public get isOverLimit(): boolean {
    if (!this.warningLimit || !this.value) {
      return false;
    } else if (this.warningLimit > 0) {
      return this.value > this.warningLimit;
    } else {
      return this.value > this.maxValue + this.warningLimit;
    }
  }
}
