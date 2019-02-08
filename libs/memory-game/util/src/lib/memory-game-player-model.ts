import { Card } from '@card-games/card-util';


export interface MemoryGamePlayerModel {
  name?: string;
  matches: Card[][];
  time?: number;
  isHuman: boolean;
  score?: number;
  id?: number;
}
