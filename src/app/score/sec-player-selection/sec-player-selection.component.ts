import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ScoreService } from 'src/app/services/score.service';
import { InningsService } from 'src/app/services/innings.service';
import { BatsmanScore, BowlerScore, Total, InningsCard } from 'src/app/model/score';
import { ScoreCardService } from 'src/app/services/score-card.service';
import { REQUIRED_VALIDATOR } from '@angular/forms/src/directives/validators';

@Component({
  selector: 'app-sec-player-selection',
  templateUrl: './sec-player-selection.component.html',
  styleUrls: ['./sec-player-selection.component.scss']
})
export class SecPlayerSelectionComponent implements OnInit {
  strikeBatsman: FormControl;
  strikeBowler: FormControl;
  nonStrikeBatsman: FormControl;
  battingSidePlayers: any = [];
  nonStrikeSelection: any = [];
  bowlingSidePlayers: any = [];



  constructor(private scoreService: ScoreService, private scorecardService: ScoreCardService, private inningsService: InningsService) { }

  ngOnInit() {
    this.battingSidePlayers = this.scoreService.battingSidePlayers;
    this.bowlingSidePlayers = this.scoreService.bowlingSidePlayers;
    this.strikeBatsman = new FormControl();
    this.strikeBowler = new FormControl();
    this.nonStrikeBatsman = new FormControl();
    this.strikeBatsman.valueChanges.subscribe((res) => {
      this.nonStrikeSelection = this.battingSidePlayers.filter((el) => {
        return el !== res;
      });
    });
  }

  onStartScoring() {
    this.scorecardService.scorecard.firstInnings = this.inningsService.innings;
    this.inningsService.innings = new InningsCard(2);
    this.inningsService.setNewBatsman(
      new BatsmanScore(this.strikeBatsman.value, true)
    );

    this.inningsService.setNewBatsman(
      new BatsmanScore(this.nonStrikeBatsman.value, false)
    );

    this.inningsService.setNewBowler(new BowlerScore(this.strikeBowler.value));
    this.scoreService.inningsChangeSubject.next(false);
  }
}
