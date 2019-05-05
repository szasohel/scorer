import { BowlerScore, Score } from './../model/score';
import { Component, OnInit } from '@angular/core';
import { BatsmanScore } from '../model/score';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  batsman1: BatsmanScore;
  batsman2: BatsmanScore;
  bowler: BowlerScore;
  constructor(private scoreService: ScoreService) {}

  ngOnInit() {
    this.batsman1 = this.scoreService.getBatsman1();
    this.batsman2 = this.scoreService.getBatsman2();
    this.bowler = this.scoreService.getBowler();
  }

  onRunEmitter(score: Score) {
    this.scoreService.updateScore(score);
  }
}
