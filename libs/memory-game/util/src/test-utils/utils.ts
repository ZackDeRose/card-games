import { ClientMemoryGamePlayer } from './../lib/client-memory-game-player.model';


export function createExpectedNewPlayer(name: string): ClientMemoryGamePlayer {
  return {
    name,
    matches: [],
    time: 0,
    isHuman: true
  }
}

export function expectToMatch(obj: MemoryGamePlayer, int: ClientMemoryGamePlayer) {
  expect(obj.name).toBe(int.name);
  expect(obj.matches).toEqual(int.matches);
  expect(obj.time).toBe(int.time);
  expect(obj.isHuman).toBe(int.isHuman);
}
