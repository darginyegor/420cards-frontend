import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { GamePageComponent } from './components/pages/game-page/game-page.component';
import { SandboxPageComponent } from './components/pages/sandbox-page/sandbox-page.component';
import { DebugPageComponent } from './components/pages/debug-page/debug-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainPageComponent,
  },
  {
    path: 'play',
    component: GamePageComponent,
  },
  {
    path: 'sandbox',
    component: SandboxPageComponent,
  },
  {
    path: 'debug',
    component: DebugPageComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
