import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardUiModule } from '@card-games/card-ui';
import { MatGridListModule } from '@angular/material';
import { SinglePlayerMemoryGameComponent } from './single-player-memory-game/single-player-memory-game.component';
import { UiMemModule } from '@card-games/ui-mem';

@NgModule({
  imports: [
    CommonModule,
    CardUiModule,
    MatGridListModule,
    UiMemModule
  ],
  declarations: [SinglePlayerMemoryGameComponent],
  exports: [SinglePlayerMemoryGameComponent]
})
export class FeatureMemSingleModule {}
