import { Card } from '@card-games/card-util';

export interface CardUi {
  card?: Card;
  faceImgPath?: string;
  backImgPath?: string;
  faceUp: boolean;
}
