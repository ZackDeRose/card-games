import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SinglePlayerMemoryGameService } from '../single-player-memory-game.service';
import { MemoryGameModel, PlayerSelection } from '@card-games/util-mem';

@Component({
  selector: 'mem-single-single-player-memory-game',
  templateUrl: './single-player-memory-game.component.html',
  styleUrls: ['./single-player-memory-game.component.css']
})
export class SinglePlayerMemoryGameComponent implements OnInit {
  board$: Observable<MemoryGameModel>;

  constructor(private _service: SinglePlayerMemoryGameService) { }

  ngOnInit() {
    this.board$ = this._service.gameStream;
  }

  processSelection(selection: PlayerSelection) {
    this._service.processSelection(selection);
  }

}
