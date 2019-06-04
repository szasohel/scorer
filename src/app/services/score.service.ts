import { AngularFireDatabase } from 'angularfire2/database';
import {
  BatsmanScore,
  Score,
  Total,
  BowlerScore,
  InningsCard,
  Extra
} from '../model/score';
import { Injectable, OnInit } from '@angular/core';
import { InningsService } from './innings.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { ScoreCardService } from './score-card.service';
import { HttpClient } from '@angular/common/http';

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
  extra = new Extra();

  activeBatsmanSubject = new Subject();
  activeBowlerSubject = new Subject();
  activePlayers: Array<any>;
  bowlerChangeSubject = new Subject();
  batsmanChangeSubject = new Subject();
  inningsChangeSubject = new Subject();
  targetRun;
  targetball: number;

  constructor(
    private http: HttpClient,
    private inningsService: InningsService,
    private scorecardService: ScoreCardService,
    private db: AngularFireDatabase
  ) {
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
    this.inningsService.innings.total = this.totalScore;
    this.inningsService.innings.extra = this.extra;
    if (score.type === 'extra') {
      if (score.run === 'WD' || score.run === 'NB') {
        this.extra[score.run] += 1;
        this.totalCount(1);
      } else if (score.run === 'Bye') {
        this.extra[score.run] += 1;
        this.totalCount(1);
        this.updateBall();
        this.changeStrike();
        this.ballAndOverCount();
      } else if (score.run === 'Bye2') {
        this.extra[score.run] += 2;
        this.totalCount(2);
        this.updateBall();
        this.ballAndOverCount();
      } else if (score.run === 'Bye3') {
        this.extra[score.run] += 3;
        this.totalCount(3);
        this.updateBall();
        this.changeStrike();
        this.ballAndOverCount();
      } else if (score.run === 'Bye4') {
        this.extra[score.run] += 4;
        this.totalCount(4);
        this.updateBall();
        this.ballAndOverCount();
      }
      this.updateExtraTotal();
    } else if (score.type === 'run' || score.type === 'out') {
      if (score.type === 'run') {
        this.totalCount(score.run);
      }
      this.ballAndOverCount();
      if (this.batsmen1.strike === true && score.outType !== 'Run') {
        this.updateBatsman1(score);
      } else {
        this.updateBatsman2(score);
      }
    }
    this.runRateCount();
    this.updateBowler(score);
    if (this.inningsService.innings.inningsNumber === 2) {
      this.targetRun =
        this.scorecardService.scorecard.firstInnings.total.run -
        this.totalScore.run;
      this.targetball =
        this.scorecardService.scorecard.totalOver * 6 -
        (this.totalScore.over * 6 + this.totalScore.ball);
      this.inningsService.innings.targetBall = this.targetball;
      this.inningsService.innings.targetRun = this.targetRun;
    }
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
    if (score.type === 'out' && score.outType !== 'Run') {
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
    this.batsmen2.strikeRate = this.calculateStrikeRate(this.batsmen2);
  }

  calculateStrikeRate(batsman: BatsmanScore) {
    const sr = +((batsman.run / batsman.ball) * 100).toFixed(2);
    if (!isFinite(sr)) {
      return 0;
    } else {
      return sr;
    }
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
      if (this.totalScore.over === this.scorecardService.scorecard.totalOver) {
        this.changeInnings();
      } else {
        this.bowlerChangeSubject.next(true);
      }
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

    if (Number.isNaN(this.totalScore.runRate)) {
      this.totalScore.runRate = 0;
    }
  }

  calculateEcon() {
    const economyRate = +(
      this.totalScore.run /
      ((this.totalScore.over * 6 + this.totalScore.ball) / 6)
    ).toFixed(2);

    if (isNaN(economyRate)) {
      this.bowler.economyRate = 0;
    } else {
      this.bowler.economyRate = economyRate;
    }
  }

  changeInnings() {
    if (this.inningsService.innings.inningsNumber === 1) {
      this.batsmanChangeSubject.next(false);
      this.bowlerChangeSubject.next(false);
      this.inningsChangeSubject.next(true);
      this.totalScore = new Total();
      this.extra = new Extra();
      const swapPlayers = this.battingSidePlayers;
      this.battingSidePlayers = this.bowlingSidePlayers;
      this.bowlingSidePlayers = swapPlayers;
    }
  }

  showLive() {
    this.db.object('/data/live/').set(this.inningsService.innings);
  }

  endLive(winner) {
    const date = `${new Date().getMonth() +
      1}/${new Date().getDate()}/${new Date().getFullYear()}`;
    this.db.object('/data/live/').set({ winner: winner, date: date });
  }
}
