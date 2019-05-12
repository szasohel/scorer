import { BatsmanScore, Score, Total, BowlerScore } from './../model/score';
import { Injectable, OnInit } from '@angular/core';
import { InningsService } from './innings.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  batsmen1: BatsmanScore;
  batsmen2: BatsmanScore;
  bowler: BowlerScore;
  bowlingSidePlayers;
  battingSidePlayers;
  totalScore = new Total();
  extra = {
    total: 0,
    WD: 0,
    NB: 0,
    Bye: 0,
    Bye1: 0,
    Bye2: 0,
    Bye3: 0,
    Bye4: 0
  };
  activeBatsmanSubject = new Subject();
  activeBowlerSubject = new Subject();
  activePlayers: Array<any>;
  bowlerChangeSubject = new Subject();
  batsmanChangeSubject = new Subject();

  constructor(private inningsService: InningsService) {
    this.inningsService.activeBatsmenSubject.subscribe(
      (activeBatsmen: Array<BatsmanScore>) => {
        this.batsmen1 = activeBatsmen.find((batsmen: BatsmanScore) => {
          return batsmen.strike === true;
        });
        this.batsmen2 = activeBatsmen.find((batsmen: BatsmanScore) => {
          return batsmen.strike === false;
        });
        this.activeBatsmanSubject.next({
          batsman1: this.batsmen1,
          batsman2: this.batsmen2
        });
      }
    );

    this.inningsService.activeBowlerSubject.subscribe((bowler: BowlerScore) => {
      this.bowler = bowler;
      this.activeBowlerSubject.next(bowler);
    });
  }

  updateBatsmanScore(batsman: BatsmanScore, run: number) {}
  setBatsman1(batsman: BatsmanScore) {
    this.batsmen1 = batsman;
  }

  setBatsman2(batsman: BatsmanScore) {
    this.batsmen2 = batsman;
  }

  setBowler(bowler: BowlerScore) {
    this.bowler = bowler;
  }

  getBatsman1() {
    return this.batsmen1;
  }
  getBatsman2() {
    return this.batsmen2;
  }
  getBowler() {
    return this.bowler;
  }
  getExtra() {
    return this.extra;
  }

  updateScore(score: Score) {
    if (score.type === 'extra') {
      if (score.run === 'WD' || score.run === 'NB') {
        this.extra[score.run] += 1;
        this.totalCount(1);
      } else if (score.run === 'Bye') {
        this.extra[score.run] += 1;
        this.totalCount(1);
        this.updateBall();
        this.ballAndOverCount();
        this.changeStrike();
      } else if (score.run === 'Bye2') {
        this.extra[score.run] += 2;
        this.totalCount(2);
        this.ballAndOverCount();
        this.updateBall();
      } else if (score.run === 'Bye3') {
        this.extra[score.run] += 3;
        this.totalCount(3);
        this.updateBall();
        this.ballAndOverCount();
        this.changeStrike();
      } else if (score.run === 'Bye4') {
        this.extra[score.run] += 4;
        this.totalCount(4);
        this.ballAndOverCount();
        this.updateBall();
      }
      this.updateExtraTotal();
    } else if (score.type === 'run' || score.type === 'out') {
      if (score.type === 'run') {
        this.totalCount(score.run);
      }
      this.ballAndOverCount();
      if (this.batsmen1.strike === true) {
        this.updateBatsman1(score);
      } else {
        this.updateBatsman2(score);
      }
    }
    this.runRateCount();
    this.updateBowler(score);
  }

  updateBowler(score: Score) {
    if (score.type === 'extra') {
      if (score.run === 'WD' || score.run === 'NB') {
        this.bowler.run += 1;
      } else if (score.run === 'Bye') {
        this.bowler.run += 1;
      } else if (score.run === 'Bye2') {
        this.bowler.run += 2;
      } else if (score.run === 'Bye3') {
        this.bowler.run += 3;
      } else if (score.run === 'Bye4') {
        this.bowler.run += 4;
      }
    }
    if (score.type === 'out' && score.outType !== 'run') {
      this.bowler.wicket++;
    } else if (score.type === 'run') {
      this.bowler.run += score.run;
      if (score.run === 4) {
        this.bowler.fours++;
      } else if (score.run === 6) {
        this.bowler.sixes++;
      } else if (score.run === 0) {
        this.bowler.dots++;
      }
    }
    this.calculateEcon();
  }

  updateBatsman1(score: Score) {
    if (score.type === 'out') {
      this.batsmen1.out = score.outType;
      this.batsmen1.bowler = this.bowler.name;
      this.batsmen1.active = false;
      this.batsmen1.strike = false;
    } else if (score.type === 'run') {
      this.batsmen1.run += score.run;
      if (score.run === 1 || score.run === 3) {
        this.changeStrike();
      } else if (score.run === 4) {
        this.batsmen1.fours++;
      } else if (score.run === 6) {
        this.batsmen1.sixes++;
      } else if (score.run === 0) {
        this.batsmen1.dots++;
      }
    }
    this.updateBall();
    this.batsmen1.strikeRate = +this.calculateStrikeRate(this.batsmen1);
  }
  updateBatsman2(score: Score) {
    if (score.type === 'out') {
      this.batsmen2.out = score.outType;
      this.batsmen2.bowler = this.bowler.name;
      this.batsmen2.active = false;
      this.batsmen2.strike = false;
    } else if (score.type === 'run') {
      this.batsmen2.run += score.run;
      if (score.run === 1 || score.run === 3) {
        this.changeStrike();
      } else if (score.run === 4) {
        this.batsmen2.fours++;
      } else if (score.run === 6) {
        this.batsmen2.sixes++;
      } else if (score.run === 0) {
        this.batsmen2.dots++;
      }
    }
    this.updateBall();
    this.batsmen2.strikeRate = +this.calculateStrikeRate(this.batsmen2);
  }

  calculateStrikeRate(batsman: BatsmanScore) {
    return ((batsman.run / batsman.ball) * 100).toFixed(2);
  }

  changeStrike() {
    this.batsmen1.strike = !this.batsmen1.strike;
    this.batsmen2.strike = !this.batsmen2.strike;
  }

  updateBall() {
    if (this.batsmen1.strike) {
      this.batsmen1.ball++;
    } else {
      this.batsmen2.ball++;
    }
  }

  updateExtraTotal() {
    this.extra.total =
      this.extra.WD +
      this.extra.NB +
      this.extra.Bye +
      this.extra.Bye1 +
      this.extra.Bye2 +
      this.extra.Bye3 +
      this.extra.Bye4;
  }

  ballAndOverCount() {
    this.totalScore.ball++;
    if (this.totalScore.ball === 6) {
      this.changeStrike();
      this.totalScore.over++;
      this.totalScore.ball = 0;
    }

    this.bowler.ball++;
    if (this.bowler.ball === 6) {
      this.bowler.over++;
      this.bowler.ball = 0;
      this.bowler.active = false;
      this.bowlerChangeSubject.next(true);
    }
  }

  totalCount(run) {
    this.totalScore.run += run;
  }

  runRateCount() {
    this.totalScore.runRate = +(
      this.totalScore.run /
      ((this.totalScore.over * 6 + this.totalScore.ball) / 6)
    ).toFixed(1);
  }

  calculateEcon() {
    this.bowler.economyRate = +(
      this.totalScore.run /
      ((this.totalScore.over * 6 + this.totalScore.ball) / 6)
    ).toFixed(2);
  }
}
