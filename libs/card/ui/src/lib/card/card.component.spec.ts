import { Card } from '@card-games/card-util';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { first, take } from '../../../../../../node_modules/rxjs/operators';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should contain an image', () => {
    expect(debugElement.queryAll(By.css('img')).length).toBe(1);
  })

  it('should adjust to the inputs of the component', async(async() => {
    component.card = { rank: 'Ace', suit: 'Spades' };
    component.faceUp = true;
    component.backImageSrc = '';
    // console.log(await component.imageSrc$.pipe(take(1)).toPromise());
    fixture.detectChanges();
    // console.log(await component.imageSrc$.pipe(take(1)).toPromise());
    await fixture.whenStable();
    // console.log(await component.imageSrc$.pipe(take(1)).toPromise());
    // debugger;
    const imageSource = debugElement.query(By.css('img')).nativeElement;
    expect(imageSource.img).toBe('cool');
    console.log(imageSource);
  }));
});
