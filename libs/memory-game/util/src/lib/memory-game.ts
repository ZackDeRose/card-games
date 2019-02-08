import { EventEmitter } from '@angular/core';
import { PlayerSelection } from './player-selection';
import { map, take } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { MemoryGamePlayerModel } from './memory-game-player-model';
import { MemoryGamePlayer } from './memory-game-player';
import { MemoryGameModel } from "./memory-game-model";
import { Card, CardSet, createShuffledDeck, Dictionary } from "@card-games/card-util";
import { MemoryGamePhase } from "./memory-game-phase";
import { isMemoryGameAiPlayer, MemoryGameAiPlayer } from './memory-game-ai-player';

export class MemoryGame implements MemoryGameModel {
  private _players$: BehaviorSubject<MemoryGamePlayer[]>;
  private _phase: MemoryGamePhase;
  private _activePlayer: MemoryGamePlayer;
  private _cards: Card[];
  private _selected: Card;
  private _selections: Card[];
  private _playersMappedById$: Observable<Dictionary<MemoryGamePlayer>>;

  get board(): (Card | 'unknown')[] {
    return this._cards.map(card => {
      if (this._selections && this._selections.includes(card)) {
        return card;
      } else if (card) {
        return 'unknown';
      }
      return null;
    })
  }

  get selected(): Card {
    return this._selected;
  }

  get players(): MemoryGamePlayer[] {
    return this._players$.value;
  }

  get activePlayer(): MemoryGamePlayer {
    return this._activePlayer;
  }

  get phase(): MemoryGamePhase {
    return this._phase;
  }

  get clientPlayer(): MemoryGamePlayer {
    return {} as MemoryGamePlayer;
  }

  changes = new EventEmitter<void>();

  constructor(
    players: MemoryGamePlayerModel[],
    deck: CardSet = new CardSet(createShuffledDeck())
  ) {
    this._phase = 'pickFirstCard';
    this._players$ = new BehaviorSubject<MemoryGamePlayer[]>(
      players.map(playerModel => {
        if (playerModel.isHuman) {
          return new MemoryGamePlayer(playerModel);
        }
        return new MemoryGameAiPlayer(playerModel);
      })
    );
    this._playersMappedById$ = this._players$.pipe(
      map(playerArr => {
        const mappedByIds: Dictionary<MemoryGamePlayer> = {};
        for (const player of playerArr) {
          mappedByIds[player.id] = player;
        }
        return mappedByIds;
      })
    )
    this._activePlayer = this._players$.value[0];
    this._cards = deck.toArray();

    for (const player of this._players$.value) {
      player.selection.subscribe(async (c: PlayerSelection) => {
        if (player !== this.activePlayer) {
          // TODO: alert or sumthangg
          console.error('NOT YO TURN BAWSS');
          return;
        }
        switch(this.phase) {
          case 'pickFirstCard': {
            console.log('picked first card');
            this._selections = [ this._cards[c.index] ];
            if (isMemoryGameAiPlayer(this.activePlayer)) {
              await this.activePlayer.getSelection(this.board)
            }
            this._phase = 'pickSecondCard';
          } break;
          case 'pickSecondCard': {
            console.log('picked second card');
            this._selections = [ ...this._selections, this._cards[c.index] ];
            if (this._selectionsMatch()) {
              this.activePlayer.addMatch(this._selections);
              for (const card of this._selections) {
                this._cards[this._cards.indexOf(card)] = null;
              }
              const matchCount = this.players.reduce((count, p) => count + p.matches.length, 0);
              if (matchCount === this.board.length / 2) {
                this._phase = 'gameOver'
              } else {
                this._phase = 'pickFirstCard';
                if (isMemoryGameAiPlayer(this._activePlayer)) {
                  await this._activePlayer.getSelection(this.board);
                }
              }
            } else {
              setTimeout(async () => {
                this._selections = [];
                const index = this.players.indexOf(this._activePlayer);
                const newIndex = (index + 1 > this.players.length - 1) ? 0 : (index + 1);
                this._activePlayer = this.players[newIndex];
                this._phase = 'pickFirstCard'
                if (isMemoryGameAiPlayer(this._activePlayer)) {
                  console.log('ai player detected');
                  await this._activePlayer.getSelection(this.board);
                }
                this.changes.emit();
              }, 1000);
            }
          } break;
          default: break;
        }
        this.changes.emit();
      });
      setTimeout(() => this.changes.emit(), 500);
    }
  }

  async processSelection(id: number, selection: PlayerSelection) {
    console.log(selection);
    const mapped: Dictionary<MemoryGamePlayer> = await this._playersMappedById$.pipe(take(1)).toPromise();
    mapped[id].selection.emit(selection);
  }

  private _selectionsMatch(): boolean {
    if (this._selections[0].rank !== this._selections[1].rank) {
      return false;
    }
    const suits = this._selections.map(card => card.suit);
    const bothRed = suits.includes('Diamonds') && suits.includes('Hearts');
    const bothBlack = suits.includes('Spades') && suits.includes('Clubs');
    return bothRed || bothBlack;
  }
}
