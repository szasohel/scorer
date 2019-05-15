import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../score/services/player.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent implements OnInit {
  players: any;
  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.getPlayers().subscribe((res) => {
      this.players = res;
    });
  }

}
