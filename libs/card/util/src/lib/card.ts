import { suits } from './collections/suits';
import { ranks } from './collections/ranks';
import { Rank } from './rank';
import { Suit } from './suit';

export interface Card {
  rank: Rank;
  suit: Suit;
}

export function isCard(card: any): card is Card {
  return card && (card as Card).rank && ranks.includes(card.rank) && (card as Card).suit && suits.includes(card.suit);
}
