import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ScoreService } from '../services/score.service';
import { BatsmanScore, BowlerScore, InningsCard, ScoreCard } from '../model/score';
import { Router } from '@angular/router';
import { InningsService } from '../services/innings.service';
import { ScoreCardService } from '../services/score-card.service';

@Component({
  selector: 'app-toss',
  templateUrl: './toss.component.html',
  styleUrls: ['./toss.component.scss']
})
export class TossComponent implements OnInit {
  teams = ['Team Red', 'Team Green'];
  parts = ['Batting', 'Bowling'];
  toss: FormControl;
  tossWinner: any;
  partSelection: any;
  showSelection: boolean;
  tossSelection: FormControl;
  strikeBatsman: FormControl;
  overs: FormControl;
  nonStrikeBatsman: FormControl;
  battingSidePlayers: string[];
  bowlingSidePlayers: string[];
  list: any;
  strikeBowler: FormControl;
  nonStrikeSelection: any;

  constructor(
    private scoreService: ScoreService,
    private scorecardService: ScoreCardService,
    private router: Router,
    private inningsService: InningsService
  ) { }

  ngOnInit() {
    this.list = JSON.parse(localStorage.getItem('teams'));
    this.toss = new FormControl();
    this.tossSelection = new FormControl();
    this.strikeBatsman = new FormControl();
    this.strikeBowler = new FormControl();
    this.overs = new FormControl();
    this.toss.valueChanges.subscribe(res => {
      this.tossWinner = res;
      this.showSelection = true;
    });

    this.tossSelection.valueChanges.subscribe(res => {
      if (res === 'Batting') {
        this.partSelection = 'bat';
        if (this.tossWinner === 'Team Red') {

          this.battingSidePlayers = this.list.teamRed;
          this.bowlingSidePlayers = this.list.teamGreen;
        } else {

          this.battingSidePlayers = this.list.teamGreen;
          this.bowlingSidePlayers = this.list.teamRed;
        }
      } else if (res === 'Bowling') {
        this.partSelection = 'bowl';
        if (this.tossWinner === 'Team Red') {
          this.battingSidePlayers = this.list.teamGreen;
          this.bowlingSidePlayers = this.list.teamRed;
        } else {
          this.bowlingSidePlayers = this.list.teamGreen;
          this.battingSidePlayers = this.list.teamRed;
        }
      }
      this.scoreService.bowlingSidePlayers = this.bowlingSidePlayers;
      this.scoreService.battingSidePlayers = this.battingSidePlayers;
    });

    this.strikeBatsman.valueChanges.subscribe((res) => {
      this.nonStrikeSelection = this.battingSidePlayers.filter((el) => {
        return el !== res;
      });
    });
    this.nonStrikeBatsman = new FormControl();
  }

  onStartScoring() {
    this.scorecardService.scorecard = new ScoreCard(+this.overs.value, this.tossWinner, this.partSelection);
    console.log(this.scorecardService.scorecard);
    this.inningsService.setInnigsCard(new InningsCard(1));
    this.inningsService.setNewBatsman(
      new BatsmanScore(this.strikeBatsman.value, true)
    );

    this.inningsService.setNewBatsman(
      new BatsmanScore(this.nonStrikeBatsman.value, false)
    );

    this.inningsService.setNewBowler(new BowlerScore(this.strikeBowler.value));

    this.router.navigate(['/score']);
  }
}
