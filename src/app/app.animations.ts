import { animate, animation, keyframes, style } from '@angular/animations';

export const Animations = {
  POP: animation(
    animate(
      '{{ time }} cubic-bezier(0,.5,.5,1)',
      keyframes([
        style({
          transform: 'scale({{ scaleFrom }})',
          offset: 0,
        }),
        style({
          transform: 'scale({{ scaleMax }})',
          offset: 0.5,
        }),
        style({
          transform: 'scale({{ scaleDrop }})',
          offset: 0.8,
        }),
        style({
          transform: 'scale({{ scaleTo }})',
          offset: 1,
        }),
      ])
    ),
    {
      params: {
        time: '0.6s',
        scaleFrom: '1',
        scaleTo: '1',
        scaleMax: '1.05',
        scaleDrop: '0.99',
      },
    }
  ),
};
