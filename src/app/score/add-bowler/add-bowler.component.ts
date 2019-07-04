import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/services/score.service';
import { FormControl } from '@angular/forms';
import { InningsService } from 'src/app/services/innings.service';
import { BowlerScore } from 'src/app/model/score';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-add-bowler',
  templateUrl: './add-bowler.component.html',
  styleUrls: ['./add-bowler.component.scss']
})
export class AddBowlerComponent implements OnInit {
  bowlingSidePlayers: any;
  strikeBowler: FormControl;
  overs: FormControl;
  runs: FormControl;
  wickets: FormControl;
  dots: FormControl;
  fours: FormControl;
  sixes: FormControl;
  bowlerscore: BowlerScore;
  ball: FormControl;

  constructor(
    private scoreService: ScoreService,
    private playerService: PlayerService,
    private inningsServie: InningsService
  ) { }

  ngOnInit() {
    this.playerService.getPlayers().subscribe(() => {
      this.bowlingSidePlayers = this.playerService.getPlayersList();
    });
    console.log(this.playerService.getPlayersList());
    this.strikeBowler = new FormControl();
    this.overs = new FormControl();
    this.runs = new FormControl();
    this.wickets = new FormControl();
    this.dots = new FormControl();
    this.fours = new FormControl();
    this.sixes = new FormControl();
    this.ball = new FormControl();
  }
  onStartScoring() {
    this.bowlerscore = new BowlerScore(this.strikeBowler.value);
    this.bowlerscore = {
      run: this.runs.value,
      over: this.overs.value,
      wicket: this.wickets.value,
      fours: this.fours.value,
      sixes: this.sixes.value,
      ball: this.ball.value,
      dots: this.dots.value,
      economyRate: this.calculateEcon(this.runs.value, this.overs.value, this.ball.value)
    };
  }

  calculateEcon(run, over, ball) {
    return +(
      run /
      ((over * 6 + ball) / 6)
    ).toFixed(2);
  }
}
