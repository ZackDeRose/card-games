import { Dictionary, fullCardName } from '@card-games/card-util';
import { randomCard } from './random-card';


describe('randomCard() utility function', () => {

  it('When called without a parameter, it should evenly give out cards', () => {
    const results: Dictionary<number> = {};
    for (let i = 0; i < 100000; i++) {
      const card = randomCard();
      const name = fullCardName(card);
      if (!results[name]) {
        results[name] = 0;
      }
      results[name]++;
    }
    expect(Object.values(results).length).toBe(52);
    for (const count of Object.values(results)) {
      expect(count).toBeGreaterThan(1700);
      expect(count).toBeLessThan(2150);
    }
  });

});