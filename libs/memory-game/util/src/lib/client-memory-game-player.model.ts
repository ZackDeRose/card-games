import { Card } from '@card-games/card-util';


export interface ClientMemoryGamePlayer {
  name: string;
  matches: Card[][];
  time: number;
  isHuman: boolean;
}
