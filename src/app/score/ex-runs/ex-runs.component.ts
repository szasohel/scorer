import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Score } from 'src/app/model/score';

@Component({
  selector: 'app-ex-runs',
  templateUrl: './ex-runs.component.html',
  styleUrls: ['./ex-runs.component.scss']
})
export class ExRunsComponent implements OnInit {
  extras = ['WD', 'NB', 'Bye', 'Bye2', 'Bye3', 'Bye4'];
  score: Score = {
    run: 0,
    type: 'extra'
  };
  @Output() extraEmitter = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  addRun(extra) {
    this.score.run = extra;
    this.extraEmitter.emit(this.score);
  }

}
