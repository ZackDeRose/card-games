import { Suit } from './../suit';
import { shortenedSuitToSuitMap } from '../mappings';
import { ShortenedSuit } from './../shortened-suit';

export function convertToFullSuit(shortenedSuit: ShortenedSuit): Suit {
  return shortenedSuitToSuitMap[shortenedSuit];
}
