import { async, TestBed } from '@angular/core/testing';
import { CardUiModule } from './card-ui.module';

describe('CardUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CardUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CardUiModule).toBeDefined();
  });
});
