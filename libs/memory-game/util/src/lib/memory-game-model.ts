import { MemoryGamePlayerModel } from './memory-game-player-model';
import { Card } from "@card-games/card-util";
import { MemoryGamePhase } from "./memory-game-phase";

export interface MemoryGameModel {
  board: (Card | 'unknown')[];
  selected: Card;
  players: MemoryGamePlayerModel[];
  activePlayer: MemoryGamePlayerModel;
  clientPlayer: MemoryGamePlayerModel;
  phase: MemoryGamePhase;
}
