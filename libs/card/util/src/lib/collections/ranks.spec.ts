import { Rank } from '../rank';
import { ranks } from './ranks';

describe('Ranks', () => {
  it('should contain a comprehensive list of every rank in order', () => {
    const expected: Rank[] = [
      'Ace',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
      'Ten',
      'Jack',
      'Queen',
      'King'
    ];

    expect(ranks).toEqual(expected);
  });
});
