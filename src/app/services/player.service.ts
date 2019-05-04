import { Injectable } from '@angular/core';
import { Player } from '../model/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  players: Array<Player> = [
    {
      name: 'ARAFAT',
      id: 1
    },
    {
      name: 'ABU ',
      id: 2
    },
    {
      name: 'ABID',
      id: 3
    },
    {
      name: 'BADSHA',
      id: 4
    },
    {
      name: 'FARUK',
      id: 5
    },
    {
      name: 'HASSAN',
      id: 6
    },
    {
      name: 'JEWEL',
      id: 7
    },
    {
      name: 'PIHAL',
      id: 8
    },
    {
      name: 'PARVEZ',
      id: 9
    },
    {
      name: 'RAKIB',
      id: 10
    },
  ];

  constructor() { }

  getPlayersList() {
    const playerList: Array<String> = [];

    this.players.forEach(player => {
      playerList.push(player.name);
    });

    return playerList;
  }
}
