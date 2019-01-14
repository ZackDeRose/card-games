import { async, TestBed } from '@angular/core/testing';
import { UiMemModule } from './ui-mem.module';

describe('UiMemModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiMemModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiMemModule).toBeDefined();
  });
});
