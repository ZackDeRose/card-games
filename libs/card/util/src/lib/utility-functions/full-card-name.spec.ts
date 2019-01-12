import { testUnshuffledDeck } from 'test/test-deck';
import { fullCardName } from './full-card-name';

describe('fullCardName() function', () => {
  it('should return the correct full name for every possible card', () => {
    for (const card of testUnshuffledDeck) {
      const expected = `${card.rank} of ${card.suit}`;
      const result = fullCardName(card);
      expect(result).toBe(expected);
    }
  });
});
