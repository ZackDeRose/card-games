import { ClientMemoryGamePlayer } from './client-memory-game-player.model';
import { MemoryGamePlayer } from "./memory-game-player";
import { createExpectedNewPlayer, expectToMatch } from '../test-utils/utils';

// beforeEach(() => {
//   console.log('boom');
//   const memoryGamePlayerRef = MemoryGamePlayer as any;
//   memoryGamePlayerRef._unnamedCount = 0;
// });
xdescribe('MemoryGamePlayer class', () => {
  describe('constructor', () => {
    const ref = MemoryGamePlayer as any;
    beforeEach(done => {
      console.log(`start of beforeEach: ${ref._unnamedCount}`);
      const memoryGamePlayerRef = MemoryGamePlayer as any;
      memoryGamePlayerRef._unnamedCount = 0;
      console.log(`end of beforeEach: ${ref._unnamedCount}`);
      done();
    });
    describe('Given a name parameter', () => {
      console.log(ref._unnamedCount);
      const name = 'Claire';
      describe('When the constructor is called', () => {
        const player = new MemoryGamePlayer(name);
        it('should create a player object with the given name', done => {
          const expected = createExpectedNewPlayer(name);
          expectToMatch(player, expected);
          done();
        });
      });
    });
    describe('Given no parameters', () => {
      console.log(ref._unnamedCount);
      describe('When the constructor is called', () => {
        const player = new MemoryGamePlayer();
        it(`Then it should have a name of 'Player1'`, done => {
          const expectedName = 'Player1';
          const expected = createExpectedNewPlayer(expectedName);
          expectToMatch(player, expected);
          done();
        });
      });
    });
    describe('Given a series of named and unnamed players', () => {
      console.log(ref._unnamedCount);
      const names = [
        'Averie',
        null,
        'Eli',
        null,
      ];
      describe('When the constructors is called', () => {
        const players = names.map(n => new MemoryGamePlayer(n));
        it('Then it should assign names appropriately', done => {
          const expectedNames = [
            'Averie',
            'Player1',
            'Eli',
            'Player2'
          ];
          const expected = expectedNames.map(n => createExpectedNewPlayer(n));
          for (let i = 0; i < expected.length; i++) {
            expectToMatch(players[i], expected[i]);
          }
          done();
        });
      });
    })
  });
});
