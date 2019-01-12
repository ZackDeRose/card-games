import { shortenedSuits } from './shortened-suits';
import { ShortenedSuit } from './../shortened-suit';

describe('shortenedSuits', () => {
  it('should contain a comprehensive list of every shortened rank in order', () => {
    const expected: ShortenedSuit[] = ['♠', '♣', '♦', '❤'];

    expect(shortenedSuits).toEqual(expected);
  });
});
