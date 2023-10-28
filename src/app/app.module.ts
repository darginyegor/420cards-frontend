import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerAvatarComponent } from './components/ui/player-avatar/player-avatar.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { LobbyPageComponent } from './components/pages/lobby-page/lobby-page.component';
import { GamePageComponent } from './components/pages/game-page/game-page.component';
import { ProgressBarComponent } from './components/ui/progress-bar/progress-bar.component';
import { PunchLineButtonComponent } from './components/ui/punch-line-button/punch-line-button.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LobbyPageComponent,
    PlayerAvatarComponent,
    GamePageComponent,
    ProgressBarComponent,
    PunchLineButtonComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
