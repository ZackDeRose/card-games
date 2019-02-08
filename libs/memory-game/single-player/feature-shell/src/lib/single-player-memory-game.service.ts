import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MemoryGameModel, MemoryGame, PlayerSelection } from '@card-games/util-mem';

@Injectable({
  providedIn: 'root'
})
export class SinglePlayerMemoryGameService {
  private _game: MemoryGame;
  gameStream: Observable<MemoryGameModel>;

  constructor() {
    this._game = new MemoryGame([
      {name: 'test player', matches: [], isHuman: true},
      {name: 'ai player', matches: [], isHuman: false}
    ])
    this.gameStream = this._game.changes.pipe(
      map(() => ({
        board: this._game.board,
        selected: this._game.selected,
        players: this._game.players.map(p => p.model),
        activePlayer: this._game.activePlayer.model,
        clientPlayer: this._game.clientPlayer.model,
        phase: this._game.phase
      }))
    );
  }

  processSelection(selection: PlayerSelection) {
    this._game.processSelection(0, selection);
  }
}
