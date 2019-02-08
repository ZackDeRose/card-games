import { CardUi } from './../card-ui.model';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { DebugElement, Component, ViewChild, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'card-games-test-host',
  template: `
    <card-games-card [cardUiObj]="cardUiObj"></card-games-card>
  `
})
class TestHostComponent {
  @ViewChild(CardComponent) public childCardComponent: CardComponent;

  @Input() cardUiObj: CardUi;
}

describe('CardComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: CardComponent;
  let parentDebugElement: DebugElement;
  let childDebugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardComponent, TestHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    component = hostComponent.childCardComponent;
    parentDebugElement = fixture.debugElement;
    childDebugElement = parentDebugElement.query(By.directive(CardComponent));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain an image if a cardUiObj is passed in', async () => {
    hostComponent.cardUiObj = {
      card: 'unknown',
      faceUp: false,
      backImageName: 'blue-background'
    }
    fixture.detectChanges();
    await fixture.whenStable();
    expect(childDebugElement.queryAll(By.css('img')).length).toBe(1);
  })

  it('should not contain an image if a cardUiObj is not passed in', async () => {
    hostComponent.cardUiObj = null;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(childDebugElement.queryAll(By.css('img')).length).toBe(0);
  })

  it('should adjust to the inputs of the component', (async() => {
    hostComponent.cardUiObj = {
      card: { rank: 'Ace', suit: 'Spades' },
      faceUp: true,
      backImageName: ''
    }
    fixture.detectChanges();
    await fixture.whenStable();
    const image = childDebugElement.query(By.css('img')).nativeElement;
    expect(image.src).toBe('http://localhost/cards/assets/card-faces/Ace%20of%20Spades.png');
  }));

  it('should back the back image when face down', async () => {
    hostComponent.cardUiObj = {
      card: 'unknown',
      faceUp: false,
      backImageName: 'test'
    }
    fixture.detectChanges();
    await fixture.whenStable();
    const image = childDebugElement.query(By.css('img')).nativeElement;
    expect(image.src).toBe('http://localhost/cards/assets/card-backs/test');
  })

  it('should emit a click event when clicked and clickable', async (done) => {
    hostComponent.cardUiObj = {
      card: { rank: 'Ace', suit: 'Spades' },
      faceUp: true,
      backImageName: '',
      clickable: true
    }
    fixture.detectChanges();
    await fixture.whenStable();
    component.clicked.subscribe(x => {
      expect(x).toBeUndefined();
      done();
    })
    const image = childDebugElement.nativeElement.querySelector('img');
    image.click();
  });

  it('should emit a click event when clicked and clickable is not specified', async (done) => {
    hostComponent.cardUiObj = {
      card: { rank: 'Ace', suit: 'Spades' },
      faceUp: true,
      backImageName: ''
    }
    fixture.detectChanges();
    await fixture.whenStable();
    component.clicked.subscribe(x => {
      expect(x).toBeUndefined();
      done();
    })
    const image = childDebugElement.nativeElement.querySelector('img');
    image.click();
  });

  it('should emit a disabled click event when not clickable and clicked', async (done) => {
    hostComponent.cardUiObj = {
      card: { rank: 'Ace', suit: 'Spades' },
      faceUp: true,
      backImageName: '',
      clickable: false,
    }
    fixture.detectChanges();
    await fixture.whenStable();
    component.disabledClick.subscribe(x => {
      expect(x).toBeUndefined();
      done();
    })
    const image = childDebugElement.nativeElement.querySelector('img');
    image.click();
  });

  it('should emit a mouseOver event', async (done) => {
    hostComponent.cardUiObj = {
      card: { rank: 'Ace', suit: 'Spades' },
      faceUp: true,
      backImageName: '',
      selectable: false,
      selected: false,
      clickable: false
    }
    fixture.detectChanges();
    await fixture.whenStable();
    component.mousedOver.subscribe(x => {
      expect(x).toBeUndefined();
      done();
    })
    childDebugElement.triggerEventHandler('mouseenter', null);
  });

  it('should have the selected css class when the input is selected and is not unselectable', async () => {
    hostComponent.cardUiObj = {
      card: { rank: 'Ace', suit: 'Spades' },
      faceUp: true,
      backImageName: '',
      selected: true
    }
    fixture.detectChanges();
    await fixture.whenStable();
    const image = childDebugElement.query(By.css('img')).nativeElement;
    const cssClass = image.getAttribute('class');
    const classes: string[] = cssClass.split(' ');
    expect(classes).toContain('selected');
  });

  it('should not have the selected css class when the input is selected but unselectable', async () => {
    hostComponent.cardUiObj = {
      card: { rank: 'Ace', suit: 'Spades' },
      faceUp: true,
      backImageName: '',
      selected: true,
      selectable: false
    }
    fixture.detectChanges();
    await fixture.whenStable();
    const image = childDebugElement.query(By.css('img')).nativeElement;
    const cssClass = image.getAttribute('class');
    const classes: string[] = (cssClass || '').split(' ')
    expect(classes).not.toContain('selected');
  });

  it('should not have the selected css class when the input is not selected', async () => {
    hostComponent.cardUiObj = {
      card: { rank: 'Ace', suit: 'Spades' },
      faceUp: true,
      backImageName: '',
      selected: false
    }
    fixture.detectChanges();
    await fixture.whenStable();
    const image = childDebugElement.query(By.css('img')).nativeElement;
    const cssClass = image.getAttribute('class');
    const classes: string[] = cssClass.split(' ');
    expect(classes).not.toContain('selected');
  });

  it('should have a selectable css class when neither selectable or selected are specified', async () => {
    hostComponent.cardUiObj = {
      card: { rank: 'Ace', suit: 'Spades' },
      faceUp: true,
      backImageName: '',
    }
    fixture.detectChanges();
    await fixture.whenStable();
    const image = childDebugElement.query(By.css('img')).nativeElement;
    const cssClass = image.getAttribute('class');
    const classes: string[] = cssClass.split(' ');
    expect(classes).toContain('selectable');
  })

});
