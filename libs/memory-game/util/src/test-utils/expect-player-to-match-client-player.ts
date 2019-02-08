import { MemoryGamePlayerModel } from './../lib/memory-game-player-model';
import { MemoryGamePlayer } from './../lib/memory-game-player';


export function expectPlayerToMatchClientPlayer(obj: MemoryGamePlayer, int: MemoryGamePlayerModel) {
  expect(obj.name).toBe(int.name);
  expect(obj.matches).toEqual(int.matches);
  expect(obj.time).toBe(int.time);
  expect(obj.isHuman).toBe(int.isHuman);
}
