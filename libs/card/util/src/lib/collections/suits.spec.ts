import { suits } from './suits';
import { Suit } from '../suit';

describe('Suits', () => {
  it('should have a comprehensive list of suits', () => {
    const expectedSuits: Suit[] = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];

    expect(suits.length).toBe(4);
    for (const expectedSuit of expectedSuits) {
      expect(suits).toContain(expectedSuit);
    }
  });
});
