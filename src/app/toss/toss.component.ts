import { PlayerService } from './../services/player.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TeamList } from '../model/player';
import { tap, switchMap } from 'rxjs/operators';

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

  constructor(private playerService: PlayerService) {}

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
}
