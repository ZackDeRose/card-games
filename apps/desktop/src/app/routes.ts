import { GameComponent } from '@card-games/feature-mem-single';
import { Routes } from "@angular/router";
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'memory-game',
    component: GameComponent
  },
  {
    path: '**/**',
    redirectTo: ''
  }
]