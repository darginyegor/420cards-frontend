import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerAvatarComponent } from './components/ui/player-avatar/player-avatar.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { GamePageComponent } from './components/pages/game-page/game-page.component';
import { ProgressBarComponent } from './components/ui/progress-bar/progress-bar.component';
import { PunchLineButtonComponent } from './components/ui/punch-line-button/punch-line-button.component';
import { FormsModule } from '@angular/forms';
import { TableSlotComponent } from './components/ui/table-slot/table-slot.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './components/ui/notification/notification.component';
import { LoaderComponent } from './components/ui/loader/loader.component';
import { CountdownComponent } from './components/ui/countdown/countdown.component';
import { BottomSheetComponent } from './components/ui/bottom-sheet/bottom-sheet.component';
import { RadioGroupComponent } from './components/ui/radio-group/radio-group.component';
import { PlayersBarComponent } from './components/ui/players-bar/players-bar.component';
import { SetupCardComponent } from './components/ui/setup-card/setup-card.component';
import { ChangelogComponent } from './components/ui/changelog/changelog.component';
import { IconComponent } from './components/ui/icon/icon.component';

import ru from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    GamePageComponent,
    PlayerAvatarComponent,
    ProgressBarComponent,
    PunchLineButtonComponent,
    TableSlotComponent,
    NotificationComponent,
    LoaderComponent,
    CountdownComponent,
    BottomSheetComponent,
    RadioGroupComponent,
    PlayersBarComponent,
    SetupCardComponent,
    ChangelogComponent,
    IconComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
