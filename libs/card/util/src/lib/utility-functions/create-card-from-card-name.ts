import { Suit } from '../suit';
import { Rank } from '../rank';
import { ranks, suits } from '../collections';
import { shortenedRankToRankMap, shortenedSuitToSuitMap } from '../mappings';
import { Card } from '../card';

function warnOfInvalidName(name: string): void {
  const warningMessage = `WARN: createCardFromCardName() was called with the invalid card name: '${name}'`;
  console.warn(warningMessage);
}

function shortenedCardNameToCard(name: string): Card {
  const shortenedRank = name[0];
  const shortenedSuit = name[1];

  const fullRank = shortenedRankToRankMap[shortenedRank];
  const fullSuit = shortenedSuitToSuitMap[shortenedSuit];

  if (!fullRank || !fullSuit) {
    warnOfInvalidName(name);
    return null;
  }

  return { rank: fullRank, suit: fullSuit };
}

function fullCardNameToCard(name: string): Card {
  const split = name.split(' of ');
  const rank = split[0] as Rank;
  const suit = split[1] as Suit;

  if (split.length !== 2 || !ranks.includes(rank) || !suits.includes(suit)) {
    warnOfInvalidName(name);
    return null;
  }

  return { rank, suit };
}

export function createCardFromCardName(cardName: string): Card {
  if (cardName.length === 2) {
    return shortenedCardNameToCard(cardName);
  }
  return fullCardNameToCard(cardName);
}
