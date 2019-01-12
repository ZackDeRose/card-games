import { Rank } from './../rank';
import { ShortenedRank } from './../shortened-rank';
import { Dictionary } from './../dictionary';

export const rankToShortenedRankMap: Dictionary<ShortenedRank> = {
  Ace: 'A',
  Two: '2',
  Three: '3',
  Four: '4',
  Five: '5',
  Six: '6',
  Seven: '7',
  Eight: '8',
  Nine: '9',
  Ten: 'T',
  Jack: 'J',
  Queen: 'Q',
  King: 'K'
};

export const shortenedRankToRankMap: Dictionary<Rank> = {
  A: 'Ace',
  '2': 'Two',
  '3': 'Three',
  '4': 'Four',
  '5': 'Five',
  '6': 'Six',
  '7': 'Seven',
  '8': 'Eight',
  '9': 'Nine',
  T: 'Ten',
  J: 'Jack',
  Q: 'Queen',
  K: 'King'
};
