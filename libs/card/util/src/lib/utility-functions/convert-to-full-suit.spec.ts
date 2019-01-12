import { shortenedSuitToSuitMap } from '../mappings';
import { shortenedSuits } from '../collections';
import { convertToFullSuit } from './convert-to-full-suit';

describe('convertToFullSuit() function', () => {
  it('should return the full suit for every shortened suit', () => {
    for (const shortenedSuit of shortenedSuits) {
      const expected = shortenedSuitToSuitMap[shortenedSuit];
      const result = convertToFullSuit(shortenedSuit);
      expect(result).toBe(expected);
    }
  });
});
