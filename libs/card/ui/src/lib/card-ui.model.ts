import { Card } from '@card-games/card-util';

export interface CardUi {
  card: Card | 'unknown';
  faceUp: boolean;
  backImageName: string;
  clickable?: boolean;
  selected?: boolean;
  selectable?: boolean;
}
