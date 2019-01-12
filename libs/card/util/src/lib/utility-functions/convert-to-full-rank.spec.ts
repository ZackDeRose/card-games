import { shortenedRanks } from '../collections';
import { shortenedRankToRankMap } from '../mappings';
import { convertToFullRank } from './convert-to-full-rank';

describe('convertToFullRank() function', () => {
  it('should return the full rank for every shortened rank', () => {
    for (const shortenedRank of shortenedRanks) {
      const expected = shortenedRankToRankMap[shortenedRank];
      const actual = convertToFullRank(shortenedRank);
      expect(actual).toBe(expected);
    }
  });
});
