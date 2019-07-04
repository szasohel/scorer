import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  bowlerList: any;
  showCard: boolean;
  bowlerForm: FormGroup;
  bowlerscore: BowlerScore;

  constructor(
    private playerService: PlayerService,
    public inningsService: InningsService
  ) {}

  ngOnInit() {
    this.playerService.getPlayers().subscribe(() => {
      this.bowlingSidePlayers = this.playerService.getPlayersList();
    });
    this.bowlerForm = new FormGroup({
      strikeBowler: new FormControl(null, [Validators.required]),
      overs: new FormControl(null, [Validators.required]),
      runs: new FormControl(null, [Validators.required]),
      wickets: new FormControl(null, [Validators.required]),
      dots: new FormControl(null, [Validators.required]),
      fours: new FormControl(null, [Validators.required]),
      balls: new FormControl(null, [Validators.required]),
      sixes: new FormControl(null, [Validators.required])
    });
  }
  onAddAnother() {
    this.bowlerscore = new BowlerScore();
    this.bowlerscore = {
      name: this.bowlerForm.get('strikeBowler').value,
      run: this.bowlerForm.get('runs').value,
      over: this.bowlerForm.get('overs').value,
      wicket: this.bowlerForm.get('wickets').value,
      fours: this.bowlerForm.get('fours').value,
      sixes: this.bowlerForm.get('sixes').value,
      ball: this.bowlerForm.get('balls').value,
      dots: this.bowlerForm.get('dots').value,
      economyRate: this.calculateEcon(
        this.bowlerForm.get('runs').value,
        this.bowlerForm.get('overs').value,
        this.bowlerForm.get('balls').value
      )
    };
    this.inningsService.addBowler(this.bowlerscore);
    this.bowlerForm.reset();
  }

  calculateEcon(run, over, ball) {
    return +(run / ((over * 6 + ball) / 6)).toFixed(2);
  }
}
