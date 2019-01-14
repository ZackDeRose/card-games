import { testUnshuffledDeck } from 'test/test-deck';
import { CardList } from './card-list';

describe('CardList abstract class', () => {
  class CardListExample extends CardList {}

  describe('constructor', () => {
    it('should take a Card array as a constructor param; a copy that is accessible via the list property', () => {
      const testCardList = new CardListExample(testUnshuffledDeck);
      expect(testCardList.list).toEqual(testUnshuffledDeck);
      expect(testCardList.list).not.toBe(testUnshuffledDeck);
    });

    it('should create an Object with an empty card array if no constructor params are provided', () => {
      const result = new CardListExample();
      expect(result.list).toEqual([]);
    });
  });

  describe('list getter method', () => {
    it('should return the private property held by the class', () => {
      const testCardList = new CardListExample(testUnshuffledDeck);
      const untypedCardList = testCardList as any;
      expect(testCardList.list).toBe(untypedCardList._list);
    });
  });

  describe('shuffle() method', () => {
    describe('on a full deck', () => {
      const deck = new CardListExample(testUnshuffledDeck);
      const unshuffledList = deck.list;
      deck.shuffle();
      const shuffledList = deck.list;

      it('should immutably rearrange the order of the cards', () => {
        expect(shuffledList).not.toBe(unshuffledList); // immutable
        expect(shuffledList).not.toEqual(unshuffledList); // shuffled (Extremely high likelihood this should pass)
        expect(shuffledList.length).toBe(unshuffledList.length);
        for (const unshuffledCard of unshuffledList) {
          expect(shuffledList).toContainEqual(unshuffledCard)
        }
      });
    });

    describe('on an empty deck', () => {
      const deck = new CardListExample();
      deck.shuffle();
      const shuffledList = deck.list;

      it('should hold an empty array in the list property after shuffling', () => {
        expect(shuffledList).toEqual([]);
      });
    });
  });

  describe('find() method', () => {
    it('should return the first index of the card if it contains a match', () => {});

    it('should return null if a match is not found', () => {});
  });
});
