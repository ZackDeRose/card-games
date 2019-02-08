import { MemoryGamePlayerModel } from './memory-game-player-model';
import { Card } from '@card-games/card-util';
import { MemoryGamePlayer } from './memory-game-player';


export class MemoryGameAiPlayer extends MemoryGamePlayer {
  async getSelection(board: (Card | 'unknown')[]) {
    const indexes: number[] = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === 'unknown') {
        indexes.push(i);
      }
    }
    const selectionIndex = Math.floor(Math.random() * indexes.length);
    await setTimeout(() => this.selection.emit({index: indexes[selectionIndex]}), 500);
  }
}

export function isMemoryGameAiPlayer(player: MemoryGamePlayerModel): player is MemoryGameAiPlayer {
  return player.isHuman === false && typeof (player as MemoryGameAiPlayer).getSelection === 'function';
}
