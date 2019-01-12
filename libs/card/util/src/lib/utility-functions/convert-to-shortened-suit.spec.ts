import { suitToShortenedSuitMap } from '../mappings';
import { suits } from '../collections';
import { convertToShortenedSuit } from './convert-to-shortened-suit';

describe('convertToShortenedSuit() function', () => {
  it('should return the shortened suit for every full suit', () => {
    for (const fullSuit of suits) {
      const expected = suitToShortenedSuitMap[fullSuit];
      const result = convertToShortenedSuit(fullSuit);
      expect(result).toBe(expected);
    }
  });
});
