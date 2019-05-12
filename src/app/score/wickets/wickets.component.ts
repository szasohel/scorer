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
  outs = ['Bold', 'Catch', 'Stump', 'Run', 'LBW'];
  score = new Score();
  @Output() outEmitter = new EventEmitter();
  constructor(
    private scoreService: ScoreService,
    private inningsService: InningsService
  ) {}

  ngOnInit() {}

  onOut(out) {
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
    this.scoreService.batsmanChangeSubject.next(true);
  }
}
