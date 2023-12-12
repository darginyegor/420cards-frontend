import { Injectable } from '@angular/core';
import { RadioGroupOption } from '../components/ui/radio-group/radio-group.component';

export interface GameSettings {
  winningScore: number;
  turnDuration: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class GameSettingsService {
  public readonly scoreOptions: RadioGroupOption[] = [
    {
      content: '5',
      value: 5,
    },
    {
      content: '10',
      value: 10,
    },
    {
      content: '15',
      value: 15,
    },
    {
      content: '20',
      value: 20,
    },
  ];
  public readonly turnDurationOptions: RadioGroupOption[] = [
    {
      content: 'Нет',
      value: null,
    },
    {
      content: '30c',
      value: 33,
    },
    {
      content: '1м',
      value: 63,
    },
    {
      content: '2м',
      value: 123,
    },
  ];

  public readonly defaultScore = 10;
  public readonly defaultTurnDuration: number | null = null;
}
