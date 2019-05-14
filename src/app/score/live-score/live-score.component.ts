import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BatsmanScore, BowlerScore, Total, Score } from 'src/app/model/score';
import { ScoreService } from 'src/app/services/score.service';
import { InningsService } from 'src/app/services/innings.service';

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
  total: Total;
  strikeBowler: any;
  bowlingSidePlayers;
  battingSidePlayers = [];
  alreadBatted: String[] = [];
  changeBowler = false;
  changeBatsman = false;
  strikeBatsman: FormControl;
  inningsChange = false;

  constructor(
    private scoreService: ScoreService,
    private inningsServie: InningsService
  ) {
    this.scoreService.inningsChangeSubject.subscribe((res: boolean) => {
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
      this.total.wicket = list[1].length - 1;
      this.battingSidePlayers = this.scoreService.battingSidePlayers.filter(
        el => {
          return !list[0].includes(el);
        }
      );
      console.log(this.battingSidePlayers);
    });
    this.strikeBatsman = new FormControl();
  }

  onRunEmitter(score: Score) {
    this.scoreService.updateScore(score);
  }

  onExtraEmitter(score: Score) {
    this.scoreService.updateScore(score);
  }

  onOutEmitter(score: Score) {
    this.scoreService.updateScore(score);
  }
  onaddingbatsman() {
    this.inningsServie.setNewBatsman(
      new BatsmanScore(this.strikeBatsman.value, true)
    );
    this.changeBatsman = false;
  }
}
