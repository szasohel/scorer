import { ScoreCardService } from 'src/app/services/score-card.service';
import { InningsService } from 'src/app/services/innings.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ScoreService } from 'src/app/services/score.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-live-score',
  templateUrl: './live-score.component.html',
  styleUrls: ['./live-score.component.scss']
})
export class LiveScoreComponent implements OnInit {
  second = false;
  inForm: FormGroup;

  constructor(
    private scoreService: ScoreCardService,
    private playerService: PlayerService,
    public inningsService: InningsService
  ) {}

  ngOnInit() {
    this.inForm = new FormGroup({
      overs: new FormControl(null, [Validators.required]),
      runs: new FormControl(null, [Validators.required]),
      wickets: new FormControl(null, [Validators.required]),
      innings: new FormControl(null, [Validators.required]),
      ball: new FormControl(null, [Validators.required])
    });
  }

  onStartScoring() {
    this.inningsService.addInningsTotal(
      this.inForm.get('innings').value,
      this.inForm.get('runs').value,
      this.inForm.get('overs').value,
      this.inForm.get('wickets').value,
      this.inForm.get('ball').value
    );
    this.inForm.reset();
    console.log(this.inningsService.innings);
  }

  onDoneAdding() {
    this.scoreService.addinnings(this.inningsService.innings);
    if (this.scoreService.scorecard.secondInnings) {
      this.second = true;
    }
    this.inningsService.innings = null;
    console.log(this.scoreService.scorecard);
  }

  onFinish() {
    this.scoreService.addScoreCard();
    this.playerService.updateBatsmanList(
      this.scoreService.scorecard.firstInnings.batting
    );

    this.playerService.updateBatsmanList(
      this.scoreService.scorecard.secondInnings.batting
    );
    this.playerService.updateBowlerList(
      this.scoreService.scorecard.firstInnings.bowling
    );

    this.playerService.updateBowlerList(
      this.scoreService.scorecard.secondInnings.bowling
    );
    this.playerService.updatePlayerList();
    console.log(this.scoreService.scorecard);
  }
}
