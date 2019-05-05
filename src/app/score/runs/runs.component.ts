import { Score } from './../../model/score';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-runs',
  templateUrl: './runs.component.html',
  styleUrls: ['./runs.component.scss']
})
export class RunsComponent implements OnInit {
  runs = [0, 1, 2, 3, 4, 6];
  score: Score = {
    run: 0,
    type: 'run'
  };
  @Output() runEmitter = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  addRun(run) {
    this.score.run = run;
    console.log(this.score);
    this.runEmitter.emit(this.score);
  }
}
