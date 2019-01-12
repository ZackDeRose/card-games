import { createDeck } from './create-deck';
import { testUnshuffledDeck } from 'test/test-deck';

describe('createDeck() function', () => {
  it('should create an unshuffled deck', () => {
    const expectedDeck = testUnshuffledDeck;
    expect(expectedDeck).toEqual(createDeck());
  });
});
