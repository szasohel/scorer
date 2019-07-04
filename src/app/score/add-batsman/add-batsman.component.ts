import { BatsmanScore } from './../../model/score';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BowlerScore } from 'src/app/model/score';
import { ScoreService } from 'src/app/services/score.service';
import { PlayerService } from 'src/app/services/player.service';
import { InningsService } from 'src/app/services/innings.service';

@Component({
  selector: 'app-add-batsman',
  templateUrl: './add-batsman.component.html',
  styleUrls: ['./add-batsman.component.scss']
})
export class AddBatsmanComponent implements OnInit {
  players: any;
  batsman: FormControl;
  overs: FormControl;
  runs: FormControl;
  wickets: FormControl;
  dots: FormControl;
  fours: FormControl;
  sixes: FormControl;
  batsmanScore: BatsmanScore;
  ball: FormControl;
  batsmanForm: FormGroup;

  constructor(
    private playerService: PlayerService,
    public inningsService: InningsService
  ) {}

  ngOnInit() {
    this.playerService.getPlayers().subscribe(() => {
      this.players = this.playerService.getPlayersList();
    });
    this.batsmanForm = new FormGroup({
      batsman: new FormControl(null, [Validators.required]),
      runs: new FormControl(null, [Validators.required]),
      dots: new FormControl(null, [Validators.required]),
      fours: new FormControl(null, [Validators.required]),
      sixes: new FormControl(null, [Validators.required]),
      ball: new FormControl(null, [Validators.required])
    });
  }
  onStartScoring() {
    this.batsmanScore = new BatsmanScore();
    this.batsmanScore = {
      name: this.batsmanForm.get('batsman').value,
      run: this.batsmanForm.get('runs').value,
      fours: this.batsmanForm.get('fours').value,
      sixes: this.batsmanForm.get('sixes').value,
      ball: this.batsmanForm.get('ball').value,
      dots: this.batsmanForm.get('dots').value,
      strikeRate: this.calculateStrike(
        this.batsmanForm.get('runs').value,
        this.batsmanForm.get('ball').value
      )
    };
    this.inningsService.addBatsman(this.batsmanScore);
    this.batsmanForm.reset();
  }

  calculateStrike(run, ball) {
    const sr = +((run / ball) * 100).toFixed(2);
    if (!isFinite(sr)) {
      return 0;
    } else {
      return sr;
    }
  }
}
