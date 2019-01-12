import { Card } from '../card';
import { shuffleCards } from './shuffle-cards';
import { createDeck } from './create-deck';

export function createShuffledDeck(): Card[] {
  return shuffleCards(createDeck());
}
