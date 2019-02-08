
import { ShortenedRank } from './shortened-rank';
import { Dictionary } from './dictionary';
import { Card } from './card';
import { BehaviorSubject } from 'rxjs';
import { createCardFromCardName } from './utility-functions/create-card-from-card-name';
import { shortenedCardName } from './utility-functions/shortened-card-name';
import {
  rankToShortenedRankMap,
  shortenedRankToRankMap,
  suitToShortenedSuitMap,
  shortenedSuitToSuitMap
} from './mappings';
import { ShortenedSuit } from './shortened-suit';

export class CardSet {
  private _cards$ = new BehaviorSubject<Dictionary<number>>({});
  private _bySuitThenRank$ = new BehaviorSubject<Dictionary<Dictionary<number>>>({});
  private _byRankThenSuit$ = new BehaviorSubject<Dictionary<Dictionary<number>>>({});
  private _count$ = new BehaviorSubject<number>(0);

  public get cards(): Dictionary<number> {
    return { ...this._cards$.value };
  }

  public get count(): number {
    return this._count$.value;
  }

  constructor(inc: Dictionary<number> | CardSet | (string | Card)[] = []) {
    if (Array.isArray(inc)) {
      this._cards$.next(this.createCardsFromArray(inc));
    } else if ((inc as CardSet).cards) {
      this._cards$.next({ ...(inc as CardSet).cards });
    } else {
      this._cards$.next(
        this.createCardsFromDictionary(inc as Dictionary<number>)
      );
    }
    this._cards$.subscribe(cards => {
      let count = 0;
      const byRankThenSuit: Dictionary<Dictionary<number>> = {};
      const bySuitThenRank: Dictionary<Dictionary<number>> = {};
      for (const [cardName, counts] of Object.entries(cards)) {
        const card = createCardFromCardName(cardName);

        if (!byRankThenSuit[card.rank]) {
          byRankThenSuit[card.rank] = {};
        }
        byRankThenSuit[card.rank][card.suit] = count;

        if (!bySuitThenRank[card.suit]) {
          bySuitThenRank[card.suit] = {};
        }
        bySuitThenRank[card.suit][card.rank] = count;

        count += counts;
      }
      this._byRankThenSuit$.next(byRankThenSuit);
      this._bySuitThenRank$.next(byRankThenSuit);
      this._count$.next(count);
    });
  }

  public add(adding: string | Card | (string | Card)[] | CardSet) {
    if (typeof adding === 'string') {
      this.addFromCardName(adding);
    } else if ((adding as Card).suit && (adding as Card).rank) {
      this.addFromCard(adding as Card);
    } else if (Array.isArray(adding)) {
      this.addFromArray(adding);
    } else {
      this.addFromCardSet(adding as CardSet);
    }
  }

  public remove(removing: string | Card | (string | Card)[] | CardSet): CardSet {
    if (typeof removing === 'string') {
      return this.removeFromCardName(removing);
    }

    if ((removing as Card).suit && (removing as Card).rank) {
      return this.removeFromCard(removing as Card);
    }

    if (Array.isArray(removing)) {
      return this.removeFromArray(removing);
    }

    return this.removeFromCardSet(removing as CardSet);
  }

  public matches(search: Partial<Card>): CardSet {
    const shortRank: ShortenedRank = rankToShortenedRankMap[search.rank];
    const shortSuit: ShortenedSuit = suitToShortenedSuitMap[search.suit];
    const cards: Card[] = [];
    for (const [shortName, count] of Object.entries(this.cards)) {
      const matchesRank = !shortRank || shortName[0] === shortRank;
      const matchesSuit = !shortSuit || shortName[1] === shortSuit;
      if (matchesRank && matchesSuit) {
        for (let i = 0; i < count; i++) {
          cards.push({
            rank: shortenedRankToRankMap[shortName[0]],
            suit: shortenedSuitToSuitMap[shortName[1]]
          });
        }
      }
    }
    return new CardSet(cards);
  }

  public toArray(): Card[] {
    const arr: Card[] = [];
    for (const [shortName, count] of Object.entries(this.cards)) {
      for (let i = 0; i < count; i++) {
        arr.push(createCardFromCardName(shortName));
      }
    }
    return arr;
  }

  private createCardsFromArray(inc: (string | Card)[]): Dictionary<number> {
    const dict: Dictionary<number> = {};
    for (const member of inc) {
      let card: Card;
      if (typeof member === 'string') {
        card = createCardFromCardName(member);
      } else {
        card = member;
      }
      if (!card) {
        const warningMsg = `WARNING: Invalid card name: '${member}'. This card was not added to the CardSet.`;
        console.warn(warningMsg);
      } else {
        const shortenedName = shortenedCardName(card);
        if (!dict[shortenedName]) {
          dict[shortenedName] = 0;
        }
        dict[shortenedName]++;
      }
    }
    return dict;
  }

  private createCardsFromDictionary(
    inc: Dictionary<number>
  ): Dictionary<number> {
    const dict: Dictionary<number> = {};
    for (const [cardName, count] of Object.entries(inc)) {
      const card = createCardFromCardName(cardName);
      if (!card && count <= 0) {
        const warningMsg = `WARNING: Invalid key and value for | key: '${cardName}', value: ${count} |. These cards were not added to the CardSet.`;
        console.warn(warningMsg);
      } else if (!card) {
        const warningMsg = `WARNING: Invalid key for | key: '${cardName}', value: ${count} |. These cards were not added to the CardSet.`;
        console.warn(warningMsg);
      } else if (count <= 0) {
        const warningMsg = `WARNING: Invalid value for | key: '${cardName}', value: ${count} |. These cards were not added to the CardSet.`;
        console.warn(warningMsg);
      } else {
        const shortenedName = shortenedCardName(card);
        if (!dict[shortenedName]) {
          dict[shortenedName] = 0;
        }
        dict[shortenedName] += count;
      }
    }
    return dict;
  }

  private addFromCardName(adding: string) {
    const card = createCardFromCardName(adding);
    if (!card) {
      console.warn(
        `WARNING: Invalid card name: '${adding}'. This card was not added to the CardSet.`
      );
      return;
    }
    this.addFromCard(card);
  }

  private addFromCard(adding: Card) {
    const shortName = shortenedCardName(adding);
    const newCards = { ...this._cards$.value };
    if (!newCards[shortName]) {
      newCards[shortName] = 0;
    }
    newCards[shortName]++;
    this._cards$.next(newCards);
  }

  private addFromArray(adding: (string | Card)[]) {
    for (const toAdd of adding) {
      if (typeof toAdd === 'string') {
        this.addFromCardName(toAdd);
      } else {
        this.addFromCard(toAdd);
      }
    }
  }

  private addFromCardSet(adding: CardSet) {
    const temp = { ...this._cards$.value };
    for (const [key, count] of Object.entries(adding.cards)) {
      if (!temp[key]) {
        temp[key] = 0;
      }
      temp[key] += count;
    }
    this._cards$.next(temp);
  }

  private removeFromCardName(removing: string): CardSet {
    const card = createCardFromCardName(removing);
    if (!card) {
      const warningMsg = `WARNING: Invalid card name: '${removing}'. This card is being ignored from the remove() call.`;
      console.warn(warningMsg);
      return new CardSet();
    }
    return this.removeFromCard(card);
  }

  private removeFromCard(removing: Card): CardSet {
    const shortName = shortenedCardName(removing);
    let removedCard: Card;
    if (this._cards$.value[shortName]) {
      const temp = { ...this._cards$.value };
      temp[shortName]--;
      if (temp[shortName] === 0) {
        delete temp[shortName];
      }
      this._cards$.next(temp);
      removedCard = createCardFromCardName(shortName);
    }
    return new CardSet(removedCard ? [removedCard] : undefined);
  }

  private removeFromArray(removing: (string | Card)[]): CardSet {
    const removed = new CardSet();
    for (const toRemove of removing) {
      removed.add(this.remove(toRemove));
    }
    return removed;
  }

  private removeFromCardSet(removing: CardSet): CardSet {
    return this.removeFromArray(removing.toArray());
  }
}
