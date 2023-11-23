import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerAvatarComponent } from './components/ui/player-avatar/player-avatar.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { GamePageComponent } from './components/pages/game-page/game-page.component';
import { SandboxPageComponent } from './components/pages/sandbox-page/sandbox-page.component';
import { ProgressBarComponent } from './components/ui/progress-bar/progress-bar.component';
import { PunchLineButtonComponent } from './components/ui/punch-line-button/punch-line-button.component';
import { FormsModule } from '@angular/forms';
import { TableSlotComponent } from './components/ui/table-slot/table-slot.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './components/ui/notification/notification.component';
import { LoaderComponent } from './components/ui/loader/loader.component';
import { HttpErrorsLogInterceptor } from './interceptors/http-errors-log.interceptor';
import { CountdownComponent } from './components/ui/countdown/countdown.component';
import { BottomSheetComponent } from './components/ui/bottom-sheet/bottom-sheet.component';
import { RadioGroupComponent } from './components/ui/radio-group/radio-group.component';
import { DebugPageComponent } from './components/pages/debug-page/debug-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    GamePageComponent,
    PlayerAvatarComponent,
    SandboxPageComponent,
    ProgressBarComponent,
    PunchLineButtonComponent,
    TableSlotComponent,
    NotificationComponent,
    LoaderComponent,
    CountdownComponent,
    BottomSheetComponent,
    RadioGroupComponent,
    DebugPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsLogInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
