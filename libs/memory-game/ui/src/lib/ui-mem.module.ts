import { CardUiModule } from '@card-games/card-ui';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoryGameComponent } from './memory-game/memory-game.component';
import { MatGridListModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CardUiModule,
    MatGridListModule
  ],
  declarations: [MemoryGameComponent],
  exports: [MemoryGameComponent]
})
export class UiMemModule {}
