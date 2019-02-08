import { Card } from '@card-games/card-util';
import { CARD_HEIGHT_TO_WIDTH_RATIO, CardUi } from '@card-games/card-ui';
import { map, take } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable, combineLatest } from 'rxjs';
import { MemoryGameModel, PlayerSelection } from '@card-games/util-mem';
import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, EventEmitter, Output, HostListener } from '@angular/core';

export interface GridLocation {
  row: number;
  column: number;
}

@Component({
  selector: 'ui-mem-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.css']
})
export class MemoryGameComponent implements OnInit, OnChanges, OnDestroy {
  @Input() model: MemoryGameModel;
  @Output() userSelection = new EventEmitter<PlayerSelection>()
  columns = 13;
  rows = 4;
  selected$ = new BehaviorSubject<GridLocation>({ row: 0, column: 0});
  private _viewPortDimensions$ = new BehaviorSubject<{height: number, width: number}>({ height: 0, width: 0});
  private _destroying$ = new Subject<void>();
  rowHeight$: Observable<string>;
  gutterSize$: Observable<string>;
  private _modelsStream = new BehaviorSubject<(Card | 'unknown')[]>([]);
  cardUis$: Observable<CardUi[][]>;

  constructor() { }

  ngOnInit() {
    this.onResize();

    this.rowHeight$ = this._viewPortDimensions$.pipe(
      // auditTime(300),
      map(({ height, width }) => {
        const columns = 13;
        const gutters = 12;
        const cardWidths = columns + gutters * .1;
        const singleCardWidth = width / cardWidths;
        console.log('singleCardWidth', singleCardWidth);
        const singleCardHeight = CARD_HEIGHT_TO_WIDTH_RATIO * singleCardWidth;
        return `${singleCardHeight}px`;
      })
    );
    this.rowHeight$.subscribe();

    this.gutterSize$ = this.rowHeight$.pipe(
      map(rowHeight => {
        const height = Number(rowHeight.split('px')[0]);
        const cardWidth = 1 / (1 / height * CARD_HEIGHT_TO_WIDTH_RATIO);
        const gutterSize = cardWidth * .1;
        console.log('cardWidth', cardWidth);
        return `${gutterSize}px`;
      })
    );
    this.gutterSize$.subscribe();

    this.cardUis$ = combineLatest(
      this._modelsStream,
      this.selected$
    ).pipe(
      map(([cardUis, selected]) => {
        const temp: CardUi[][] = [];
        for (let i = 0; i < this.rows; i++) {
          if (!temp[i]) {
            temp[i] = [];
          }
          for (let j = 0; j < this.columns; j++) {
            const card: Card | 'unknown' = cardUis[i * this.columns + j];
            temp[i][j] = {
              card,
              faceUp: card === 'unknown' ? false : true,
              backImageName: 'blue_back.png',
              clickable: card === 'unknown',
              selected: selected.row === i && selected.column === j ? true : false,
              selectable: card === 'unknown'
            }
          }
        }
        return temp;
      })
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.model) {
      console.log(changes.model);
      this._modelsStream.next(this.model.board);
    }
  }

  ngOnDestroy() {
    this._destroying$.next();
  }

  async mousedOver(card: CardUi, row: number, column: number) {
    // console.log('moused over', card);
    const cardUis = await this.cardUis$.pipe(take(1)).toPromise();
    if (
      cardUis[row][column].selectable !== false &&
      (
        this.selected$.value.row !== row ||
        this.selected$.value.column !== column
      )
    ) {
      this.selected$.next({row, column});
    }
  }

  clicked(row: number, column: number) {
    this._choose(row, column);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    // console.log(event.target.innerWidth);
    this._resizeViewPort({
      height: window.innerHeight,
      width: window.innerWidth,
    })
  }

  @HostListener('window:keyup', ['$event'])
  async keyEvent(event: KeyboardEvent) {
    console.log(event);
    const temp = { ...this.selected$.value };
    const cardUiObjs = await this.cardUis$.pipe(take(1)).toPromise();
    if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowLeft'
    ) {
      let count = 0;
      do {
        switch(event.key) {
          case 'ArrowDown': {
            temp.row++;
            if (temp.row === this.rows) {
              temp.row = 0;
            }
          } break;
          case 'ArrowUp': {
            temp.row--;
            if (temp.row < 0) {
              temp.row = this.rows - 1;
            }
          } break;
          case 'ArrowRight': {
            temp.column++;
            if (temp.column === this.columns) {
              temp.column = 0;
            }
          } break;
          case 'ArrowLeft': {
            temp.column--;
            if (temp.column < 0) {
              temp.column = this.columns - 1;
            }
          } break;
        }
        count++;
      } while (cardUiObjs[temp.row][temp.column].selectable === false && (count < this.rows || count < this.columns))
      this.selected$.next(temp);
    }
    if (event.key === 'Enter' && cardUiObjs[this.selected$.value.row][this.selected$.value.column].selectable !== false) {
      console.log(this.selected$.value);

      this._choose(this.selected$.value.row, this.selected$.value.column);
    }
  }


  private _choose(row: number, column: number) {
    // const card = this.cardUiObjs[row][column];
    // const temp = {
    //   ...card,
    //   faceUp: !card.faceUp,
    //   selectable: false,
    //   clickable: false,
    //   notSelectable: true
    // };
    // this.cardUiObjs[row][column] = temp;
    this.userSelection.emit({ index: row * this.columns + column });
  }

  private _resizeViewPort(dimensions: { height: number, width: number}) {
    this._viewPortDimensions$.next(dimensions);
    console.log('just adjusted the subject');
  }

}
