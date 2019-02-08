import { PlayerSelection } from './player-selection';
import { EventEmitter } from '@angular/core';
import { MemoryGamePlayerModel } from './memory-game-player-model';
import { Card } from '@card-games/card-util';


export class MemoryGamePlayer implements MemoryGamePlayerModel {
  private static _unnamedCount = 0;
  private static _count = 0;
  private _name: string;
  private _matches: Card[][];
  private _time: number;
  private _isHuman: boolean;
  private _id: number
  
  get name(): string {
    return this._name;
  }

  get matches(): Card[][] {
    return this._matches;
  }

  get time(): number {
    return this._time;
  }

  get isHuman(): boolean {
    return this._isHuman;
  }

  get score(): number {
    return this.matches.length;
  }

  get id(): number {
    return this._id;
  }

  get model(): MemoryGamePlayerModel {
    return {
      name: this._name,
      matches: this._matches,
      time: this._time,
      isHuman: this._isHuman,
      id: this._id
    }
  }

  selection = new EventEmitter<PlayerSelection>();

  addMatch(match: Card[]) {
    this._matches = [ ...this._matches, [ ...match ] ];
  }

  constructor(model: MemoryGamePlayerModel) {
    this._name = model.name ? model.name : `Player${++MemoryGamePlayer._unnamedCount}`;
    this._matches = [];
    this._time = 0;
    this._isHuman = model.isHuman;
    this._id = MemoryGamePlayer._count++;
  }
}