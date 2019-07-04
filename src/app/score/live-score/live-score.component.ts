
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-live-score',
  templateUrl: './live-score.component.html',
  styleUrls: ['./live-score.component.scss']
})
export class LiveScoreComponent implements OnInit {
  overs: FormControl;
  runs: FormControl;
  wickets: FormControl;
  innings: FormControl;

  ngOnInit() {
    this.overs = new FormControl();
    this.runs = new FormControl();
    this.wickets = new FormControl();
    this.innings = new FormControl();
  }

  onStartScoring() {

  }
}
