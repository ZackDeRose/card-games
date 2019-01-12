import { suitToShortenedSuitMap } from '../mappings';
import { Suit } from '../suit';
import { ShortenedSuit } from '../shortened-suit';

export function convertToShortenedSuit(fullSuit: Suit): ShortenedSuit {
  return suitToShortenedSuitMap[fullSuit];
}
