import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { FormControl } from '@angular/forms';
import { Player } from '../model/player';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent implements OnInit {
  players: any;
  view: any;
  name: any;
  error: string;
  showbutton: boolean;
  constructor(
    private playerService: PlayerService,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {
    this.name = new FormControl();
    this.playerService.getPlayers().subscribe(res => {
      this.players = res;
    });

    this.authService.isAuthenticated$.subscribe(isAuthed => {
      this.showbutton = isAuthed;
    });
  }

  onHeaderClicked(name) {
    this.view = name;
  }
  onAddName() {
    const playerInTheList = this.players.find(el => {
      return el.name === this.name.value.toUpperCase();
    });
    if (!playerInTheList) {
      const player = new Player(
        this.name.value.toUpperCase(),
        this.players.length++
      );
      this.playerService.addPlayer(player);
    } else {
      this.error = 'Player already exist. Please enter different name';
      setTimeout(() => {
        this.error = '';
      }, 2000);
    }
  }
}
