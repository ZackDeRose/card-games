import { suits, shortenedRanks, shortenedSuits, ranks } from '../collections';
import { Card } from '../card';
import { shortenedRankToRankMap, shortenedSuitToSuitMap } from '../mappings';
import { createCardFromCardName } from './create-card-from-card-name';

describe('createCardFromCardName() utility function', () => {
  beforeEach(() => spyOn(console, 'warn').and.callThrough());

  describe('shortened card names', () => {
    it('should return the proper card for any valid name', () => {
      for (const shortenedSuit of shortenedSuits) {
        for (const shortenedRank of shortenedRanks) {
          const name = `${shortenedRank}${shortenedSuit}`;
          const result = createCardFromCardName(name);

          const fullSuit = shortenedSuitToSuitMap[shortenedSuit];
          const fullRank = shortenedRankToRankMap[shortenedRank];
          const expected: Card = { suit: fullSuit, rank: fullRank };
          expect(result).toEqual(expected);
        }
      }
    });
  });

  describe('full card names', () => {
    it('should return the proper card for any valid name', () => {
      for (const suit of suits) {
        for (const rank of ranks) {
          const name = `${rank} of ${suit}`;
          const result = createCardFromCardName(name);

          const expected: Card = { suit, rank };
          expect(result).toEqual(expected);
        }
      }
    });
  });

  describe('invalid card names', () => {
    describe('2-character card name', () => {
      const invalidName = 'TF';
      const warnSpy = jest.spyOn(global.console, 'warn');
      const result = createCardFromCardName(invalidName);

      it('should warn that an invalid name was used', () => {
        const warnMsg = `WARN: createCardFromCardName() was called with the invalid card name: '${invalidName}'`;
        expect(warnSpy).toHaveBeenCalledWith(warnMsg);
      });
      it('should return null', () => {
        expect(result).toBeNull();
      });
    });
  });

  describe('full card names', () => {
    const invalidName = 'Dooby dooby doo';
    const warnSpy = jest.spyOn(global.console, 'warn');
    const result = createCardFromCardName(invalidName);

    it('should warn that an invalid name was used', () => {
      const warnMsg = `WARN: createCardFromCardName() was called with the invalid card name: '${invalidName}'`;
      expect(warnSpy).toHaveBeenCalledWith(warnMsg);
    });
    it('should return null', () => {
      expect(result).toBeNull();
    });
  });
});
