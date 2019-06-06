import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Score } from 'src/app/model/score';
import { InningsService } from 'src/app/services/innings.service';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-wickets',
  templateUrl: './wickets.component.html',
  styleUrls: ['./wickets.component.scss']
})
export class WicketsComponent implements OnInit {
  outs = ['Bold', 'Caught', 'Stump', 'Run', 'LBW'];
  score = new Score();
  @Output() outEmitter = new EventEmitter();
  confirmOut: boolean;
  constructor(
    private scoreService: ScoreService,
    private inningsService: InningsService
  ) { }

  ngOnInit() { }

  onOut(out) {
    if (out === 'Run') {
      this.confirmOut = confirm('Did you select the right batsmen?');
      if (this.confirmOut) {
        this.outUpdate(out);
      }
    } else {
      this.outUpdate(out);
    }
  }

  outUpdate(out) {
    const listName = [];
    const outBatsman = [];
    this.score.type = 'out';
    this.score.outType = out;
    this.outEmitter.emit(this.score);
    this.inningsService.innings.batting.forEach((el: any) => {
      listName.push(el.name);
      outBatsman.push(el.out);
    });
    this.inningsService.alradyBattedSubject.next([listName, outBatsman]);
    if (this.scoreService.totalScore.wicket === (this.scoreService.battingSidePlayers.length - 1)) {
      this.scoreService.changeInnings();
    } else {
      this.scoreService.batsmanChangeSubject.next(true);
    }
  }
}
