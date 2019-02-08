import { By } from '@angular/platform-browser';
import { UiMemModule, MemoryGameComponent } from '@card-games/ui-mem';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePlayerMemoryGameComponent } from './single-player-memory-game.component';
import { SinglePlayerMemoryGameService } from '../single-player-memory-game.service';

describe('SinglePlayerMemoryGameComponent', () => {
  let component: SinglePlayerMemoryGameComponent;
  let fixture: ComponentFixture<SinglePlayerMemoryGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePlayerMemoryGameComponent ],
      providers: [ SinglePlayerMemoryGameService ],
      imports: [ UiMemModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePlayerMemoryGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call processSelection() when child emits a userSelection event', async () => {
    const processSelectionSpy = spyOn(component, 'processSelection');
    component.board$.subscribe(x => console.log(x));
    // console.log(component._service._game.board);
    await fixture.whenStable();
    console.log('service', component._service.gameStream);
    console.log('board', component.board$);
    console.log('are same', component._service.gameStream === component.board$);
    // console.log(fixture.)
    const child = fixture.debugElement.query(By.directive(MemoryGameComponent));

    const memoryGameComponent = child.componentInstance as MemoryGameComponent;
    const userSelection = { index: 1 };
    memoryGameComponent.userSelection.emit(userSelection);
    await fixture.whenStable()
    expect(processSelectionSpy).toHaveBeenCalledWith(userSelection);
  })
});
