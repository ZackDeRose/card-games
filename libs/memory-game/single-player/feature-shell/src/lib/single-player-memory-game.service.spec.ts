import { TestBed } from '@angular/core/testing';

import { SinglePlayerMemoryGameService } from './single-player-memory-game.service';

describe('SinglePlayerMemoryGameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SinglePlayerMemoryGameService = TestBed.get(SinglePlayerMemoryGameService);
    expect(service).toBeTruthy();
  });
});
