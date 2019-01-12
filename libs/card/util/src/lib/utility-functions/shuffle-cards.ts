import { Card } from './../card';

export function shuffleCards(cards: Card[]): Card[] {
  const copy = [...cards];
  const shuffled: Card[] = [];
  while (copy.length !== 0) {
    const index = Math.floor(Math.random() * copy.length);
    const randomCard = copy.splice(index, 1)[0];
    shuffled.push(randomCard);
  }
  return shuffled;
}
