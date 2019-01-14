import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';

@NgModule({
  imports: [CommonModule],
  declarations: [GameComponent],
  exports: [GameComponent]
})
export class FeatureMemSingleModule {}
