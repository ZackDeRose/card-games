import { Card, Dictionary } from "@card-games/card-util";
import { MemoryGamePhase } from "./memory-game-phase";

export interface ClientMemoryGame {
  board: Dictionary<Dictionary<Card>>;
  players: MemoryGamePlayer[];
  activePlayer: MemoryGamePlayer;
  clientPlayer: MemoryGamePlayer;
  phase: MemoryGamePhase;
}
