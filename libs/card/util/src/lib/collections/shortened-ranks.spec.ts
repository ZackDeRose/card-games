import { shortenedRanks } from './shortened-ranks';
import { ShortenedRank } from '../shortened-rank';

describe('shortenedRanks', () => {
  it('should contain a comprehensive list of every shortened rank in order', () => {
    const expected: ShortenedRank[] = [
      'A',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'T',
      'J',
      'Q',
      'K'
    ];

    expect(shortenedRanks).toEqual(expected);
  });
});
