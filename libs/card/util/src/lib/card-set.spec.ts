import { Card } from './card';
import { CardSet } from './card-set';
import { Dictionary } from './dictionary';
import { shortenedCardName } from './utility-functions';

describe('CardSet class', () => {
  beforeEach(() => spyOn(console, 'warn').and.callThrough());

  describe('constructor', () => {
    describe('without an argument', () => {
      const result = new CardSet();

      it('should result in a CardSet with an empty cards property', () => {
        expect(result.cards).toEqual({});
      });
    });

    describe('with a properly formatted Dictionary parameter', () => {
      describe('using only shortened card names', () => {
        const dictionary = {
          'A♠': 1,
          'A❤': 2,
          'K♣': 1
        };
        const result = new CardSet(dictionary);

        it('should result in a object whose cards property is equivalent to the parameter', () => {
          expect(result.cards).toEqual(dictionary);
        });
      });

      describe('using only full card names', () => {
        const dictionary = {
          'Ace of Spades': 1,
          'Ace of Hearts': 2,
          'King of Clubs': 1
        };

        const result = new CardSet(dictionary);

        it('should result in an object whose cards property corresponds to the parameter', () => {
          const expected = {
            'A♠': 1,
            'A❤': 2,
            'K♣': 1
          };
          expect(result.cards).toEqual(expected);
        });
      });

      describe('using a combination of shortened and full card names', () => {
        const dictionary = {
          'A♠': 1,
          'Ace of Hearts': 1,
          'A❤': 1,
          'King of Clubs': 1
        };
        const result = new CardSet(dictionary);

        it('should result in an object whose cards property corresponds to the parameter', () => {
          const expected = {
            'A♠': 1,
            'A❤': 2,
            'K♣': 1
          };
          expect(result.cards).toEqual(expected);
        });
      });
    });

    describe('with an improperly formatted Dictionary parameter', () => {
      const dictionary = {
        'King of Carbs': 1,
        'King of Diamonds': 0,
        TT: -4,
        'King of Clubs': 1
      };
      const result = new CardSet(dictionary);

      it('should create a CardSet of the valid members', () => {
        const expected = { 'K♣': 1 };
        expect(result.cards).toEqual(expected);
      });

      xit('should log a warning for each misformatted member', () => {
        const warningMsgForKingOfCarbs = `WARNING: Invalid key for | key: 'King of Carbs', value: 1 |. These cards were not added to the CardSet.`;
        expect(console.warn).toHaveBeenCalledWith(warningMsgForKingOfCarbs);

        const warningMsgForKingOfDiamonds = `WARNING: Invalid value for | key: 'King of Diamonds', value: 0 |. These cards were not added to the CardSet.`;
        expect(console.warn).toHaveBeenCalledWith(warningMsgForKingOfDiamonds);

        const warningMsgForTT = `WARNING: Invalid key and value for | key: 'TT', value: -4 |. These cards were not added to the CardSet.`;
        expect(console.warn).toHaveBeenCalledWith(warningMsgForTT);
      });
    });

    describe('with a CardSet parameter', () => {
      const toCopy = new CardSet({ '2♠': 2 });
      const result = new CardSet(toCopy);

      it('should immutably copy the parameter', () => {
        expect(toCopy.cards).toEqual(result.cards);
        expect(toCopy.cards).not.toBe(result.cards);
      });
    });

    describe('with a properly formatted array of card names', () => {
      const array = ['A♠', 'Ace of Hearts', 'A❤', 'King of Clubs'];
      const result = new CardSet(array);

      it('should create a CardSet that corresponds to the array', () => {
        const expected = {
          'A♠': 1,
          'A❤': 2,
          'K♣': 1
        };

        expect(result.cards).toEqual(expected);
      });
    });

    describe('with an array of card names that includes an improperly formatted name', () => {
      const array = ['King of Carbs', 'King of Diamonds', 'TT', 'K♣'];
      const result = new CardSet(array);

      it('should create a CardSet of the valid members', () => {
        const expected = { 'K♣': 1, 'K♦': 1 };
        expect(result.cards).toEqual(expected);
      });

      xit('should log a warning for each misformatted member', () => {
        const warningMsgForKingOfCarbs = `WARNING: Invalid card name: 'King of Carbs'. This card was not added to the CardSet.`;
        expect(console.warn).toHaveBeenCalledWith(warningMsgForKingOfCarbs);

        const warningMsgForTT = `WARNING: Invalid card name: 'TT'. This card was not added to the CardSet.`;
        expect(console.warn).toHaveBeenCalledWith(warningMsgForTT);
      });
    });

    describe('with an array of Cards', () => {
      const array: Card[] = [
        { rank: 'Ace', suit: 'Spades' },
        { rank: 'Ace', suit: 'Hearts' },
        { rank: 'Ace', suit: 'Hearts' },
        { rank: 'King', suit: 'Clubs' }
      ];
      const result = new CardSet(array);

      it('should create a CardSet that corresponds to the array', () => {
        const expected = {
          'A♠': 1,
          'A❤': 2,
          'K♣': 1
        };

        expect(result.cards).toEqual(expected);
      });
    });
  });

  describe('cards getter method', () => {
    const cards: Card[] = [
      { rank: 'Ace', suit: 'Spades' },
      { rank: 'Ace', suit: 'Hearts' },
      { rank: 'Ace', suit: 'Hearts' },
      { rank: 'King', suit: 'Clubs' }
    ];
    const result = new CardSet(cards);
    const expected: Dictionary<number> = {
      'A♠': 1,
      'A❤': 2,
      'K♣': 1
    };

    it('should return an immutable copy of the _cards property', () => {
      expect(result.cards).toEqual(expected);
      expect(result.cards).not.toBe(expected);
    });
  });

  describe('count getter method', () => {
    const cards: Card[] = [
      { rank: 'Ace', suit: 'Spades' },
      { rank: 'Ace', suit: 'Hearts' },
      { rank: 'Ace', suit: 'Hearts' },
      { rank: 'King', suit: 'Clubs' }
    ];
    const set = new CardSet(cards);
    const result = set.count;
    const expected = 4;

    it('should return the total count of the cards', () => {
      expect(result).toBe(expected);
    });
  });

  describe('add() method', () => {
    const cards: Card[] = [
      { rank: 'Ace', suit: 'Spades' },
      { rank: 'Ace', suit: 'Hearts' },
      { rank: 'Ace', suit: 'Hearts' },
      { rank: 'King', suit: 'Clubs' }
    ];
    const template = new CardSet(cards);

    describe('with a card name', () => {
      describe('that is a valid', () => {
        describe('full name', () => {
          const newName = 'Ace of Spades';
          const newSet = new CardSet(template);
          newSet.add(newName);
          const expectedSet = new CardSet([
            ...cards,
            { rank: 'Ace', suit: 'Spades' }
          ]);
          it('should add the card to the set', () => {
            expect(newSet.cards).toEqual(expectedSet.cards);
          });
          it('should update the count', () => {
            expect(newSet.count).toBe(5);
          });
        });

        describe('shortened name', () => {
          const newName = 'A♠';
          const newSet = new CardSet(cards);
          newSet.add(newName);
          const expectedSet = new CardSet([
            ...cards,
            { rank: 'Ace', suit: 'Spades' }
          ]);
          it('should add the card to the set', () => {
            expect(newSet.cards).toEqual(expectedSet.cards);
          });
          it('should update the count', () => {
            expect(newSet.count).toBe(5);
          });
        });
      });

      describe('that is not valid', () => {
        const newName = 'Zack';
        const newSet = new CardSet(cards);
        newSet.add(newName);
        const expectedSet = new CardSet(cards);
        it('should not change the card set', () => {
          expect(newSet.cards).toEqual(expectedSet.cards);
        });
        it('should not affect the count since no cards were added', () => {
          expect(newSet.count).toBe(4);
        });
        xit('should warn the user that the add failed', () => {
          const warningMsg = `WARNING: Invalid card name: ${newName}. This card was not added to the CardSet.`;
          expect(console.warn).toHaveBeenCalledWith(warningMsg);
        });
      });
    });
    describe('with a card object', () => {
      const newCard: Card = { suit: 'Spades', rank: 'Ace' };
      const newSet = new CardSet(cards);
      newSet.add(newCard);
      const expectedSet = new CardSet([...cards, { ...newCard }]);
      it('should add the card to the set', () => {
        expect(newSet.cards).toEqual(expectedSet.cards);
      });
      it('should update the count', () => {
        expect(newSet.count).toBe(5);
      });
    });
    describe('with an array of cardNames', () => {
      const resultSet = new CardSet(cards);
      const arrayOfCardsToAdd = [
        'King of Carbs',
        'King of Diamonds',
        'TT',
        'K♣'
      ];
      resultSet.add(arrayOfCardsToAdd);

      it('should add valid members to the set', () => {
        const expectedSet = new CardSet({
          'K♣': 2,
          'K♦': 1,
          'A♠': 1,
          'A❤': 2
        });
        expect(resultSet.cards).toEqual(expectedSet.cards);
      });

      it('should have an accurate count', () => {
        expect(resultSet.count).toBe(6);
      });

      xit('should log a warning for each misformatted member', () => {
        const warningMsgForKingOfCarbs = `WARNING: Invalid card name: 'King of Carbs'. This card was not added to the CardSet.`;
        expect(console.warn).toHaveBeenCalledWith(warningMsgForKingOfCarbs);

        const warningMsgForTT = `WARNING: Invalid card name: 'TT'. This card was not added to the CardSet.`;
        expect(console.warn).toHaveBeenCalledWith(warningMsgForTT);

        expect(console.warn).toHaveBeenCalledTimes(2);
      });
    });
    describe('with an array of cards', () => {
      const resultSet = new CardSet(cards);
      const arrayOfCardsToAdd: Card[] = [
        { suit: 'Diamonds', rank: 'King' },
        { suit: 'Clubs', rank: 'King' }
      ];
      resultSet.add(arrayOfCardsToAdd);

      it('should add those cards to the set', () => {
        const expectedSet = new CardSet({
          'K♣': 2,
          'K♦': 1,
          'A♠': 1,
          'A❤': 2
        });
        expect(resultSet.cards).toEqual(expectedSet.cards);
      });

      it('should update the count', () => {
        expect(resultSet.count).toBe(6);
      });
    });
    describe('with a CardSet', () => {
      const resultSet = new CardSet(cards);
      const cardSetToAdd = new CardSet([
        { suit: 'Diamonds', rank: 'King' },
        { suit: 'Clubs', rank: 'King' }
      ]);
      resultSet.add(cardSetToAdd);

      it('should add those cards to the set', () => {
        const expectedSet = new CardSet({
          'K♣': 2,
          'K♦': 1,
          'A♠': 1,
          'A❤': 2
        });
        expect(resultSet.cards).toEqual(expectedSet.cards);
      });

      it('should update the count', () => {
        expect(resultSet.count).toBe(6);
      });
    });
  });

  describe('remove() method', () => {
    const startingCards: Card[] = [
      { rank: 'Ace', suit: 'Spades' },
      { rank: 'Ace', suit: 'Hearts' },
      { rank: 'Ace', suit: 'Hearts' },
      { rank: 'King', suit: 'Clubs' }
    ];

    describe('with a card name', () => {
      describe('full card name', () => {
        describe('match found', () => {
          const set = new CardSet(startingCards);
          const cardName = 'Ace of Hearts';
          const removed = set.remove(cardName);

          it('should remove one card from the set', () => {
            const result = set.cards;
            const expected: Dictionary<number> = {
              'A♠': 1,
              'A❤': 1,
              'K♣': 1
            };
            expect(result).toEqual(expected);
          });

          it('should return the removed card as a CardSet', () => {
            const expected = new CardSet(['A❤']);
            expect(removed.cards).toEqual(expected.cards);
          });

          it('should update the count', () => {
            expect(set.count).toBe(3);
          });
        });
        describe('no match', () => {
          const set = new CardSet(startingCards);
          const cardName = 'Two of Clubs';
          const removed = set.remove(cardName);

          it('should not remove any cards from the set', () => {
            const result = set.cards;
            const expected: Dictionary<number> = {
              'A♠': 1,
              'A❤': 2,
              'K♣': 1
            };
            expect(result).toEqual(expected);
          });

          it('should return an empty CardSet', () => {
            const expected = new CardSet();
            expect(removed.cards).toEqual(expected.cards);
          });

          it('should update the count', () => {
            expect(set.count).toBe(4);
          });
        });
      });
      describe('shortened name', () => {
        const set = new CardSet(startingCards);
        const cardName = 'A❤';
        const removed = set.remove(cardName);

        it('should remove one card from the set', () => {
          const result = set.cards;
          const expected: Dictionary<number> = {
            'A♠': 1,
            'A❤': 1,
            'K♣': 1
          };
          expect(result).toEqual(expected);
        });

        it('should return the removed card as a CardSet', () => {
          const expected = new CardSet(['A❤']);
          expect(removed.cards).toEqual(expected.cards);
        });

        it('should update the count', () => {
          expect(set.count).toBe(3);
        });
      });
      describe('that is not valid', () => {
        const set = new CardSet(startingCards);
        const startingDict = set.cards;
        const cardName = 'Dooby dooby doo';
        const removed = set.remove(cardName);

        it('should not alter the set', () => {
          expect(set.cards).toEqual(startingDict);
        });

        xit('should warn that the card is invalid', () => {
          expect(console.warn).toHaveBeenCalledTimes(1);
          const warnMsg = `WARNING: Invalid card name: '${cardName}'. This remove() call is being ignored.`;
          expect(console.warn).toHaveBeenCalledWith(warnMsg);
        });

        it('should return an empty CardSet', () => {
          const expected = new CardSet();
          expect(removed.cards).toEqual(expected.cards);
        });

        it('should maintain the original count', () => {
          expect(set.count).toBe(startingCards.length);
        });
      });
    });
    describe('with a card object', () => {
      describe('that exists in the CardSet', () => {
        const set = new CardSet(startingCards);
        const card: Card = { suit: 'Hearts', rank: 'Ace' };
        const removed = set.remove(card);

        it('should remove one card from the set', () => {
          const result = set.cards;
          const expected: Dictionary<number> = {
            'A♠': 1,
            'A❤': 1,
            'K♣': 1
          };
          expect(result).toEqual(expected);
        });

        it('should return the removed card as a CardSet', () => {
          const expected = new CardSet(['A❤']);
          expect(removed.cards).toEqual(expected.cards);
        });

        it('should update the count', () => {
          expect(set.count).toBe(3);
        });
      });
      describe('that does not exist in the CardSet', () => {
        const set = new CardSet(startingCards);
        const card: Card = { suit: 'Hearts', rank: 'Two' };
        const removed = set.remove(card);

        it('should not remove any cards from the set', () => {
          const result = set.cards;
          const expected: Dictionary<number> = {
            'A♠': 1,
            'A❤': 2,
            'K♣': 1
          };
          expect(result).toEqual(expected);
        });

        it('should return an empty CardSet', () => {
          const expected = new CardSet();
          expect(removed.cards).toEqual(expected.cards);
        });

        it('should still have the original count', () => {
          expect(set.count).toBe(startingCards.length);
        });
      });
    });
    describe('with an array of cardNames', () => {
      const set = new CardSet(startingCards);
      const arrayOfCardsToRemove = [
        'King of Carbs',
        'King of Diamonds',
        'TT',
        'K♣'
      ];
      const removed = set.remove(arrayOfCardsToRemove);

      xit('should warn for each invalid card name', () => {
        expect(console.warn).toHaveBeenCalledTimes(2);

        const carbsWarnMsg = `WARNING: Invalid card name: 'King of Carbs'. This card is being ignored from the remove() call.`;
        expect(console.warn).toHaveBeenCalledWith(carbsWarnMsg);

        const ttWarnMsg = `WARNING: Invalid card name: 'TT'. This card is being ignored from the remove() call.`;
        expect(console.warn).toHaveBeenCalledWith(ttWarnMsg);
      });

      it('should remove valid card names from the set', () => {
        const expected = new CardSet([
          { rank: 'Ace', suit: 'Spades' },
          { rank: 'Ace', suit: 'Hearts' },
          { rank: 'Ace', suit: 'Hearts' }
        ]);
        expect(set.cards).toEqual(expected.cards);
      });

      it('should return the cards removed', () => {
        const expected = new CardSet(['K♣']);
        expect(removed.cards).toEqual(expected.cards);
      });

      it('should adjust the count', () => {
        expect(set.count).toBe(3);
      });
    });
    describe('with an array of cards', () => {
      const set = new CardSet(startingCards);
      const arrayOfCardsToRemove: Card[] = [
        { rank: 'Ace', suit: 'Hearts' },
        { rank: 'Ace', suit: 'Hearts' },
        { rank: 'Ace', suit: 'Hearts' }
      ];
      const removed = set.remove(arrayOfCardsToRemove);

      it('should remove existing cards from the set', () => {
        const expected = new CardSet([
          { rank: 'Ace', suit: 'Spades' },
          { rank: 'King', suit: 'Clubs' }
        ]);
        expect(set.cards).toEqual(expected.cards);
      });

      it('should return the cards removed', () => {
        const expected = new CardSet(['A❤', 'A❤']);
        expect(removed.cards).toEqual(expected.cards);
      });

      it('should adjust the count', () => {
        expect(set.count).toBe(2);
      });
    });
    describe('with a CardSet', () => {
      const set = new CardSet(startingCards);
      const arrayOfCardsToRemove: Card[] = [
        { rank: 'Ace', suit: 'Hearts' },
        { rank: 'Ace', suit: 'Hearts' },
        { rank: 'Ace', suit: 'Hearts' }
      ];
      const setToRemove = new CardSet(arrayOfCardsToRemove);
      const removed = set.remove(setToRemove);

      it('should remove existing cards from the set', () => {
        const expected = new CardSet([
          { rank: 'Ace', suit: 'Spades' },
          { rank: 'King', suit: 'Clubs' }
        ]);
        expect(set.cards).toEqual(expected.cards);
      });

      it('should return the cards removed', () => {
        const expected = new CardSet(['A❤', 'A❤']);
        expect(removed.cards).toEqual(expected.cards);
      });

      it('should adjust the count', () => {
        expect(set.count).toBe(2);
      });
    });
  });

  describe('matches() method', () => {
    const cards: Card[] = [
      { rank: 'Ace', suit: 'Spades' },
      { rank: 'Ace', suit: 'Hearts' },
      { rank: 'Ace', suit: 'Hearts' },
      { rank: 'King', suit: 'Clubs' }
    ];
    const set = new CardSet(cards);

    describe('with only a suit', () => {
      it('should return matches and not affect the set', () => {
        const cardsSnapshot = set.cards;
        const result = set.matches({ suit: 'Hearts' });
        const expected = new CardSet({ 'A❤': 2 });
        expect(result.cards).toEqual(expected.cards);
        expect(set.cards).toEqual(cardsSnapshot);
      });
    });
    describe('with only a rank', () => {
      it('should return matches and not affect the set', () => {
        const cardsSnapshot = set.cards;
        const result = set.matches({ rank: 'Ace' });
        const expected = new CardSet({ 'A❤': 2, 'A♠': 1 });
        expect(result.cards).toEqual(expected.cards);
        expect(set.cards).toEqual(cardsSnapshot);
      });
    });
    describe('with suit and rank', () => {
      it('should return matches and not affect the set', () => {
        const cardsSnapshot = set.cards;
        const result = set.matches({ rank: 'King', suit: 'Clubs' });
        const expected = new CardSet({ 'K♣': 1 });
        expect(result.cards).toEqual(expected.cards);
        expect(set.cards).toEqual(cardsSnapshot);
      });
    });
    describe('with neither', () => {
      it('should return a set that is equivalent to the original, and not affect the set', () => {
        const cardsSnapshot = set.cards;
        const result = set.matches({});
        const expected = new CardSet(set);
        expect(result.cards).toEqual(expected.cards);
        expect(set.cards).toEqual(cardsSnapshot);
      });
    });
  });

  describe('toArray() method', () => {
    it('should return an array of all cards in the set [ORDER DOES NOT MATTER]', () => {
      const cards: Card[] = [
        { rank: 'Ace', suit: 'Spades' },
        { rank: 'Ace', suit: 'Hearts' },
        { rank: 'Ace', suit: 'Hearts' },
        { rank: 'King', suit: 'Clubs' }
      ];
      const cardSet = new CardSet(cards);
      const result = cardSet.toArray();

      expect(result.length).toBe(4);

      const resultMap: Dictionary<number> = {};
      for (const card of result) {
        const key = shortenedCardName(card);
        if (!resultMap[key]) {
          resultMap[key] = 0;
        }
        resultMap[key]++;
      }
      const expectedMap = {
        'A♠': 1,
        'A❤': 2,
        'K♣': 1
      };
      expect(resultMap).toEqual(expectedMap);
    });
  });
});
