import { async, TestBed } from '@angular/core/testing';
import { FeatureMemSingleModule } from './feature-mem-single.module';

describe('FeatureMemSingleModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureMemSingleModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureMemSingleModule).toBeDefined();
  });
});
