import { ShortenedSuit } from './../shortened-suit';
import { Suit } from './../suit';
import { Dictionary } from './../dictionary';

export const suitToShortenedSuitMap: Dictionary<ShortenedSuit> = {
  Clubs: '♣',
  Hearts: '❤',
  Spades: '♠',
  Diamonds: '♦'
};

export const shortenedSuitToSuitMap: Dictionary<Suit> = {
  '♣': 'Clubs',
  '❤': 'Hearts',
  '♠': 'Spades',
  '♦': 'Diamonds'
};
