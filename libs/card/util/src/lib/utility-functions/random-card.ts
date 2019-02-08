import { CardSet } from '../card-set';
import { createDeck } from './create-deck';
import { Card } from '../card';


export function randomCard(deck: CardSet = new CardSet(createDeck())): Card {
  const cards = deck.toArray();
  const index = Math.floor(Math.random() * cards.length);
  return { ...cards[index] };
}
