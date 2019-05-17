import { BatsmanScore } from './../../model/score';
import { ScoreService } from '../../services/score.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-batsman',
  templateUrl: './batsman.component.html',
  styleUrls: ['./batsman.component.scss']
})
export class BatsmanComponent implements OnInit {
  @Input() batsman: BatsmanScore;

  constructor(private scoreService: ScoreService) { }

  ngOnInit() { }


  onClickBatsman(batsman) {
    if (batsman === this.scoreService.batsmen1) {
      this.scoreService.batsmen1.strike = true;
      this.scoreService.batsmen2.strike = false;
    } else if (batsman === this.scoreService.batsmen2) {
      this.scoreService.batsmen2.strike = true;
      this.scoreService.batsmen1.strike = false;
    }
  }
}
