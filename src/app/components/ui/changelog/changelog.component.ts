import { Component } from '@angular/core';
import { map, of, switchMap, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss'],
})
export class ChangelogComponent {
  // public readonly changes$ = of(this.store.get('LAST_VERSION')).pipe(
  //   // TODO: remove check for old-new clients
  //   map((version) =>
  //     !version && this.store.get('PLAYER_AVATAR_ID') ? '0.0.0' : version
  //   ),
  //   switchMap((version) => this.api.getChangelog(version || undefined)),
  //   tap((response) => this.store.set('LAST_VERSION', response.currentVersion)),
  //   map((response) => response.changelog)
  // );

  public readonly changes$ = of([
    {
      version: 'v0.0.0420',
      text: '  —  добавили «Что у нас нового?»',
    },
  ]);

  constructor(private readonly api: ApiService, private store: StoreService) {}
}
