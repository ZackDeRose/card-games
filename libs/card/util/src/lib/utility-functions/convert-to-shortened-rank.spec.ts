import { ranks } from '../collections';
import { rankToShortenedRankMap } from '../mappings';
import { convertToShortenedRank } from './convert-to-shortened-rank';

describe('convertToShortenedRank() function', () => {
  it('should return the shortened version of every rank', () => {
    for (const fullRank of ranks) {
      const expected = rankToShortenedRankMap[fullRank];
      const actual = convertToShortenedRank(fullRank);
      expect(expected).toBe(actual);
    }
  });
});
