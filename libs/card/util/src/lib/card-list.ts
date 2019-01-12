import { Card } from './card';
import { shuffleCards } from './utility-functions';

export abstract class CardList {
  private _list: Card[];

  public get list(): Card[] {
    return this._list;
  }

  constructor(cards: Card[] = []) {
    this._list = [...cards];
  }

  public shuffle(): void {
    this._list = shuffleCards(this._list);
  }
}
