import { Card } from './../card';

export function fullCardName(card: Card): string {
  return `${card.rank} of ${card.suit}`;
}
