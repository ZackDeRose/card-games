import { Card, fullCardName } from '@card-games/card-util';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'card-games-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnChanges {
  @Input() card: Card;
  @Input() faceUp: boolean;
  @Input() backImageSrc: string;
  @Input() clickable: boolean;

  @Output() clicked = new EventEmitter<void>();

  imageSrc$: Observable<string>;
  private _faceImageSrc$ = new Subject<string>();
  private _backImageSrc$ = new Subject<string>();
  private _faceUp$ = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
    console.log('here');
    this.imageSrc$ = combineLatest(this._faceUp$, this._backImageSrc$, this._faceImageSrc$).pipe(
      tap(() => console.log('tapped')),
      map(([faceUp, back, face]) => `../../assets/${faceUp ? 'card-faces' : 'card-backs'}/${faceUp ? face : back}`)
    );
  } 

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.card) {
      this._faceImageSrc$.next(fullCardName(this.card));
      console.log('foo');
    }
    if (changes.faceUp) {
      this._faceUp$.next(this.faceUp);
    }
    if (changes.backImageSrc) {
      this._backImageSrc$.next(this.backImageSrc);
    }
  }

}
