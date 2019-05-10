import { PlayerService } from './../services/player.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TeamList } from '../model/player';
import { tap, switchMap } from 'rxjs/operators';
import { InningsService } from '../services/innings.service';
import { ScoreService } from '../services/score.service';
import { BatsmanScore, BowlerScore } from '../model/score';
import { Router } from '@angular/router';

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
  nonStrikeBatsman: FormControl;
  battingSidePlayers: string[];
  bowlingSidePlayers: string[];
  list: any;
  strikeBowler: FormControl;

  constructor(
    private playerService: PlayerService,
    private scoreService: ScoreService,
    private router: Router) { }

  ngOnInit() {
    this.list = JSON.parse(localStorage.getItem('teams'));
    this.toss = new FormControl();
    this.tossSelection = new FormControl();
    this.strikeBatsman = new FormControl();
    this.nonStrikeBatsman = new FormControl();
    this.strikeBowler = new FormControl();
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
    });
  }

  onStartScoring() {
    this.scoreService.setBatsman1(new BatsmanScore(this.strikeBatsman.value, true));
    this.scoreService.setBatsman2(new BatsmanScore(this.nonStrikeBatsman.value, false));
    this.scoreService.setBowler(new BowlerScore(this.strikeBowler.value));
    this.router.navigate(['/score']);
  }
}
