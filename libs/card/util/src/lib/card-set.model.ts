import { Dictionary } from './dictionary';

export interface CardSetModel {
  cards: Dictionary<number>;
  count: number;
}
