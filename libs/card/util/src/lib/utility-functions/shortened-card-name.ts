import { Card } from '../card';
import { convertToShortenedRank } from './convert-to-shortened-rank';
import { convertToShortenedSuit } from './convert-to-shortened-suit';

export function shortenedCardName(card: Card): string {
  return `${convertToShortenedRank(card.rank)}${convertToShortenedSuit(
    card.suit
  )}`;
}
