import { ClientMemoryGamePlayer } from './client-memory-game-player.model';
import { Card } from '@card-games/card-util';


export class MemoryGamePlayer implements ClientMemoryGamePlayer {
  private static _unnamedCount = 0;
  private _name: string;
  private _matches: Card[][];
  private _time: number;
  private _isHuman: boolean;
  
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

  constructor(name?: string) {
    if (!name) {
      name = `Player${++MemoryGamePlayer._unnamedCount}`;
    }
    this._name = name;
    this._matches = [];
    this._time = 0;
    this._isHuman = true;
  }
}