import { testUnshuffledDeck } from 'test/test-deck';
import { shuffleCards } from './shuffle-cards';

describe('shuffleCards() utility function', () => {
  it('should return a shuffled array of cards', () => {
    const startingCards = [...testUnshuffledDeck];
    const shuffled = shuffleCards(startingCards);
    expect(shuffled.length).toBe(startingCards.length);
    for (const unshuffledCard of startingCards) {
      expect(shuffled).toContain(unshuffledCard);
    }
  });

  it('should not alter the original collection', () => {
    const deck = [...testUnshuffledDeck];
    shuffleCards(deck);
    expect(deck).toEqual(testUnshuffledDeck);
  });
});
