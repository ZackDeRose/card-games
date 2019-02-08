import { MemoryGamePlayerModel } from '../lib/memory-game-player-model';


export function createExpectedNewPlayerFromName(name: string): MemoryGamePlayerModel {
  return {
    name,
    matches: [],
    time: 0,
    isHuman: true
  }
}