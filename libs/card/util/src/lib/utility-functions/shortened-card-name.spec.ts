import { testUnshuffledDeck } from 'test/test-deck';
import { convertToShortenedRank } from './convert-to-shortened-rank';
import { convertToShortenedSuit } from './convert-to-shortened-suit';
import { shortenedCardName } from './shortened-card-name';

describe('shortenedCardName() function', () => {
  it('should return the correct shortened name for every possible card', () => {
    for (const card of testUnshuffledDeck) {
      const expected = `${convertToShortenedRank(
        card.rank
      )}${convertToShortenedSuit(card.suit)}`;
      const result = shortenedCardName(card);
      expect(result).toBe(expected);
    }
  });
});
