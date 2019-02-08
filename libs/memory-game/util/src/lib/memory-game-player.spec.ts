import { MemoryGamePlayer } from "./memory-game-player";
import { createExpectedNewPlayerFromName, expectPlayerToMatchClientPlayer } from '../test-utils';


beforeEach(() => {
  const memoryGamePlayerRef = MemoryGamePlayer as any;
  memoryGamePlayerRef._unnamedCount = 0;
});

describe('MemoryGamePlayer class', () => {

  describe('constructor', () => {

    describe('Given a name parameter', () => {
      let name: string;
      
      beforeEach(() => name = 'Claire');
      
      describe('When the constructor is called', () => {
        let player: MemoryGamePlayer;
        
        beforeEach(() => player = new MemoryGamePlayer(name));
        
        it('Then it should create a player object with the given name', () => {
          const expected = createExpectedNewPlayerFromName(name);
          expectPlayerToMatchClientPlayer(player, expected);
        });

      });

    });

    describe('Given no parameters', () => {

      describe('When the constructor is called', () => {
        let player: MemoryGamePlayer;
        
        beforeEach(() => player = new MemoryGamePlayer());
        
        it(`Then it should have a name of 'Player1'`, () => {
          const expectedName = 'Player1';
          const expected = createExpectedNewPlayerFromName(expectedName);
          expectPlayerToMatchClientPlayer(player, expected);
        });

      });

    });

    describe('Given a series of named and unnamed players', () => {
      let names: string[];

      beforeEach(() => names = [ 'Averie', null, 'Eli', null ]);
      
      describe('When the constructors is called', () => {
        let players: MemoryGamePlayer[];

        beforeEach(() => players = names.map(n => new MemoryGamePlayer(n)));
        
        it('Then it should assign names appropriately', () => {
          const expectedNames = [
            'Averie',
            'Player1',
            'Eli',
            'Player2'
          ];
          const expected = expectedNames.map(n => createExpectedNewPlayerFromName(n));
          for (let i = 0; i < expected.length; i++) {
            expectPlayerToMatchClientPlayer(players[i], expected[i]);
          }
        });

      });

    })

  });

});
