import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { TeamService } from '../../services/team.service';
import { NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-selection',
  templateUrl: './team-selection.component.html',
  styleUrls: ['./team-selection.component.scss']
})
export class TeamSelectionComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  playerList: Array<String>;
  teamList: Array<String>;
  teamRed: FormControl;
  teamGreen: FormControl;
  teamRedSelectedPlayer = [];
  teamGreenSelectedPlayer = [];
  playerLeft: String[];

  constructor(
    private playerService: PlayerService,
    private teamService: TeamService,
    private router: Router
  ) {
    this.playerService.getPlayers().subscribe(() => {
      this.playerLeft = this.playerService.getPlayersList();
    });
  }

  ngOnInit() {
    this.teamRed = new FormControl();
    this.teamGreen = new FormControl();

    this.teamRed.valueChanges.subscribe(res => {
      this.teamRedSelectedPlayer.push(...res);
      this.playerFilter(res);
    });

    this.teamGreen.valueChanges.subscribe(res => {
      this.teamGreenSelectedPlayer.push(...res);
      this.playerFilter(res);
    });
  }

  playerFilter(res) {
    this.playerLeft = this.playerLeft.filter(el => {
      return !res.includes(el);
    });
  }

  remove(player) {
    this.playerLeft.push(player);
    if (this.teamGreenSelectedPlayer.includes(player)) {
      this.teamGreenSelectedPlayer.splice(
        this.teamGreenSelectedPlayer.indexOf(player),
        1
      );
    } else {
      this.teamRedSelectedPlayer.splice(
        this.teamRedSelectedPlayer.indexOf(player),
        1
      );
    }
  }

  onGoToss() {
    this.playerService.selectedPlayerSubject.next({
      teamRed: this.teamRedSelectedPlayer,
      teamGreen: this.teamGreenSelectedPlayer
    });
    localStorage.setItem(
      'teams',
      JSON.stringify({
        teamRed: this.teamRedSelectedPlayer,
        teamGreen: this.teamGreenSelectedPlayer
      })
    );
    this.router.navigate(['/scorer/toss']);
  }
}
