import { Subject, Observable } from 'rxjs';
import { BowlerScore, Score, Total } from './../model/score';
import { Component, OnInit } from '@angular/core';
import { BatsmanScore } from '../model/score';
import { ScoreService } from '../services/score.service';
import { FormControl } from '@angular/forms';
import { InningsService } from '../services/innings.service';
import { NavigationGuardService } from '../services/navigation-guard.service.';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit, NavigationGuardService {
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

  constructor(
    private scoreService: ScoreService,
    private inningsServie: InningsService
  ) {
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

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    console.log('canDeactivate has fired in the component!');
    return false;
  }

  ngOnInit() {
    this.batsman1 = this.scoreService.getBatsman1();
    this.batsman2 = this.scoreService.getBatsman2();
    this.bowler = this.scoreService.getBowler();
    this.extra = this.scoreService.getExtra();
    this.total = this.scoreService.totalScore;
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
