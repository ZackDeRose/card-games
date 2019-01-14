import { MemoryGamePlayer } from './memory-game-player';
import { ClientMemoryGame } from "./client-memory-game.model";
import { Dictionary, Card } from "@card-games/card-util";
import { MemoryGamePhase } from "./memory-game-phase";

export class MemoryGame implements ClientMemoryGame {
  get board(): Dictionary<Dictionary<Card>> {
    return {};
  }

  get players(): MemoryGamePlayer[] {
    return [];
  }

  get activePlayer(): MemoryGamePlayer {
    return {} as MemoryGamePlayer;
  }

  get phase(): MemoryGamePhase {
    return 'pickFirstCard';
  }

  constructor() {}


}