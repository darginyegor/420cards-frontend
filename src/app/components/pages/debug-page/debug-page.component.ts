import { Component } from '@angular/core';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-debug-page',
  templateUrl: './debug-page.component.html',
  styleUrls: ['./debug-page.component.scss'],
})
export class DebugPageComponent {
  public events = this.logs.all;
  constructor(private readonly logs: LogsService) {}
  public getDataString(data: any) {
    return JSON.stringify(data, null, 2);
  }
}
