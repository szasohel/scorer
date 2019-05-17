import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BatsmanScore, BowlerScore, Total, Score } from 'src/app/model/score';
import { ScoreService } from 'src/app/services/score.service';
import { InningsService } from 'src/app/services/innings.service';
import { ScoreCardService } from 'src/app/services/score-card.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-live-score',
  templateUrl: './live-score.component.html',
  styleUrls: ['./live-score.component.scss']
})
export class LiveScoreComponent implements OnInit {
  batsman1: BatsmanScore;
  batsman2: BatsmanScore;
  bowler: BowlerScore;
  extra: any;
  total = new Total();
  strikeBowler: any;
  bowlingSidePlayers;
  battingSidePlayers = [];
  alreadBatted: String[] = [];
  changeBowler = false;
  changeBatsman = false;
  strikeBatsman: FormControl;
  inningsChange = false;
  innings = this.inningsServie.innings;
  isShowWinner: boolean;
  winner: string;
  winningMargin: number;
  winningMarginRun: number;

  constructor(
    private scoreService: ScoreService,
    private scorecardService: ScoreCardService,
    private inningsServie: InningsService,
    private playerService: PlayerService
  ) {
    this.scoreService.inningsChangeSubject.subscribe((res: boolean) => {
      this.innings = this.inningsServie.innings;
      this.total = new Total;
      this.inningsChange = res;
    });
    this.scoreService.bowlerChangeSubject.subscribe((res: boolean) => {
      this.changeBowler = res;
    });
    this.scoreService.batsmanChangeSubject.subscribe((res: boolean) => {
      this.changeBatsman = res;
    });
    this.scoreService.activeBatsmanSubject.subscribe((res: any) => {
      this.batsman1 = res.batsman1;
      this.batsman2 = res.batsman2;
    });
    this.scoreService.activeBowlerSubject.subscribe((res: any) => {
      this.bowler = res;
    });
  }

  ngOnInit() {
    this.batsman1 = this.scoreService.getBatsman1();
    this.batsman2 = this.scoreService.getBatsman2();
    this.bowler = this.scoreService.getBowler();
    this.extra = this.scoreService.getExtra();
    this.inningsServie.alradyBattedSubject.subscribe((list: any) => {
      this.scoreService.totalScore.wicket = list[1].length - 1;
      this.total = this.scoreService.totalScore;
      this.battingSidePlayers = this.scoreService.battingSidePlayers.filter(
        el => {
          return !list[0].includes(el);
        }
      );
    });
    this.strikeBatsman = new FormControl();
  }

  onRunEmitter(score: Score) {
    this.scoreService.updateScore(score);
    this.findWinner();
  }

  onExtraEmitter(score: Score) {
    this.scoreService.updateScore(score);
    this.findWinner();
  }

  onOutEmitter(score: Score) {
    console.log('out');
    this.scoreService.updateScore(score);
    this.findWinner();
  }

  findWinner() {
    if (this.inningsServie.innings.inningsNumber === 2 && this.scoreService.battingSidePlayers.length - this.total.wicket === 1) {
      this.scorecardService.scorecard.secondInnings = this.inningsServie.innings;
      if ((this.scorecardService.scorecard.tossWinner === 'Team Red' && this.scorecardService.scorecard.selection === 'bat')
        || (this.scorecardService.scorecard.tossWinner === 'Team Green' && this.scorecardService.scorecard.selection === 'bowl')) {
        this.winner = 'Team Red';
        this.winningMarginRun = this.scorecardService.scorecard.firstInnings.total.run
          - this.scorecardService.scorecard.secondInnings.total.run;
      } else {
        this.winner = 'Team Green';
        this.winningMarginRun = this.scorecardService.scorecard.firstInnings.total.run
          - this.scorecardService.scorecard.secondInnings.total.run;

      }
      this.persistdata();
      this.isShowWinner = true;
    } else if (this.inningsServie.innings.inningsNumber === 2 && this.scoreService.targetRun <= 0) {
      this.scorecardService.scorecard.secondInnings = this.inningsServie.innings;
      if ((this.scorecardService.scorecard.tossWinner === 'Team Red' && this.scorecardService.scorecard.selection === 'bat')
        || (this.scorecardService.scorecard.tossWinner === 'Team Green' && this.scorecardService.scorecard.selection === 'bowl')) {
        this.winner = 'Team Green';
        this.winningMargin = (this.scoreService.battingSidePlayers.length - 1) - this.total.wicket;

      } else {
        this.winner = 'Team Red';
        this.winningMargin = (this.scoreService.battingSidePlayers.length - 1) - this.total.wicket;
      }
      this.persistdata();
      this.isShowWinner = true;
    } else if (this.scoreService.targetball <= 0 && this.scoreService.targetRun > 0) {
      this.scorecardService.scorecard.secondInnings = this.inningsServie.innings;
      if ((this.scorecardService.scorecard.tossWinner === 'Team Red' && this.scorecardService.scorecard.selection === 'bat')
        || (this.scorecardService.scorecard.tossWinner === 'Team Green' && this.scorecardService.scorecard.selection === 'bowl')) {
        this.winner = 'Team Red';
        this.winningMarginRun = this.scorecardService.scorecard.firstInnings.total.run
          - this.scorecardService.scorecard.secondInnings.total.run;
      } else {
        this.winner = 'Team Green';
        this.winningMarginRun = this.scorecardService.scorecard.firstInnings.total.run
          - this.scorecardService.scorecard.secondInnings.total.run;
      }
      this.persistdata();
      this.isShowWinner = true;
    }
  }
  onaddingbatsman() {
    this.inningsServie.setNewBatsman(
      new BatsmanScore(this.strikeBatsman.value, true)
    );
    this.changeBatsman = false;
  }

  persistdata() {
    this.playerService.updateBatsmanList(this.scorecardService.scorecard.firstInnings.batting);
    this.playerService.updateBowlerList(this.scorecardService.scorecard.firstInnings.bowling);
    this.playerService.updateBatsmanList(this.scorecardService.scorecard.secondInnings.batting);
    this.playerService.updateBowlerList(this.scorecardService.scorecard.secondInnings.bowling);
    this.scorecardService.updateScoreCard();
    this.playerService.updatePlayerList();
  }
}
