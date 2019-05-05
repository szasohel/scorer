import { BatsmanScore, Score } from './../model/score';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  batsmen1: BatsmanScore = {
    name: null,
    run: 0,
    ball: 0,
    fours: 0,
    sixes: 0,
    dots: 0,
    strikeRate: 0,
    active: true
  };
  batsmen2: BatsmanScore = {
    name: null,
    run: 0,
    ball: 0,
    fours: 0,
    sixes: 0,
    dots: 0,
    strikeRate: 0,
    active: false
  };
  bowler = {
    name: null,
    over: 0,
    run: 0,
    wicket: 0,
    sixes: 0,
    fours: 0,
    dots: 0,
    economyRate: 0,
    active: false
  };
  constructor() {}

  updateBatsmanScore(batsman: BatsmanScore, run: number) {}

  getBatsman1() {
    return this.batsmen1;
  }
  getBatsman2() {
    return this.batsmen2;
  }
  getBowler() {
    return this.bowler;
  }

  updateScore(score: Score) {
    console.log(this.batsmen1.active, this.batsmen2.active);
    if (this.batsmen1.active === true) {
      this.updateBatsman1(score);
    } else {
      this.updateBatsman2(score);
    }
  }

  updateBatsman1(score: Score) {
    this.batsmen1.ball++;
    if (score.type === 'out') {
      this.batsmen1.out = score.outType;
      this.batsmen1.bowler = score.bowler;
    } else if (score.type === 'run') {
      this.batsmen1.run += score.run;
      if (score.run === 1 || score.run === 3) {
        this.batsmen1.active = false;
        this.batsmen2.active = true;
      } else if (score.run === 4) {
        this.batsmen1.fours++;
      } else if (score.run === 6) {
        this.batsmen1.sixes++;
      } else if (score.run === 0) {
        this.batsmen1.dots++;
      }
    }
    this.batsmen1.strikeRate = +this.calculateStrikeRate(this.batsmen1);
  }
  updateBatsman2(score: Score) {
    this.batsmen2.ball++;
    if (score.type === 'out') {
      this.batsmen2.out = score.outType;
      this.batsmen2.bowler = score.bowler;
    } else if (score.type === 'run') {
      this.batsmen2.run += score.run;
      if (score.run === 1 || score.run === 3) {
        this.batsmen2.active = false;
        this.batsmen1.active = true;
      } else if (score.run === 4) {
        this.batsmen2.fours++;
      } else if (score.run === 6) {
        this.batsmen2.sixes++;
      } else if (score.run === 0) {
        this.batsmen2.dots++;
      }
    }
    this.batsmen2.strikeRate = +this.calculateStrikeRate(this.batsmen2);
  }

  calculateStrikeRate(batsman: BatsmanScore) {
    return ((batsman.run / batsman.ball) * 100).toFixed(2);
  }
}
