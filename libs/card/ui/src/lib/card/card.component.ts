import { Card, fullCardName, isCard } from '@card-games/card-util';
import { CardUi } from './../card-ui.model';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, HostListener } from '@angular/core';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'card-games-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnChanges {
  @Input() cardUiObj: CardUi;

  @Output() clicked = new EventEmitter<void>();
  @Output() disabledClick = new EventEmitter<void>();
  @Output() mousedOver = new EventEmitter<void>();

  imageSrc$: Observable<string>;
  private _faceImageSrc$ = new BehaviorSubject<string>('poop');
  private _backImageSrc$ = new BehaviorSubject<string>('pee');
  private _faceUp$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  ngOnInit() {
    this.imageSrc$ = combineLatest(this._faceUp$, this._backImageSrc$, this._faceImageSrc$).pipe(
      map(([faceUp, back, face]: [boolean, string, string]) =>
        `/cards/assets/${faceUp ? 'card-faces' : 'card-backs'}/${faceUp ? face : back}`
      )
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.cardUiObj && this.cardUiObj) {
      if (isCard(this.cardUiObj.card)) {
        this._faceImageSrc$.next(`${fullCardName(this.cardUiObj.card as Card)}.png`);
      }
      this._faceUp$.next(this.cardUiObj.faceUp);
      this._backImageSrc$.next(this.cardUiObj.backImageName);
    }
  }

  click() {
    if (this.cardUiObj.clickable !== false) {
      this.clicked.emit();
    } else {
      this.disabledClick.emit();
    }
  }

  @HostListener('mouseenter')
  mouseOver() {
    this.mousedOver.emit();
  }
}
