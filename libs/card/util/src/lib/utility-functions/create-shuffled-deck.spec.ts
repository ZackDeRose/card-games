import { testUnshuffledDeck } from 'test/test-deck';
import { createShuffledDeck } from './create-shuffled-deck';

describe('createShuffledDeck() function', () => {
  it('should create a new shuffled deck of cards', () => {
    const shuffledDeck = createShuffledDeck();
    expect(shuffledDeck.length).toBe(52);
    for (const card of testUnshuffledDeck) {
      expect(shuffledDeck).toContainEqual(card);
    }
  });
});
