import { Player } from './../model/player';
import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { BatsmanScore, BowlerScore } from '../model/score';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  selectedPlayerSubject = new Subject();

  players: Array<Player> = [];
  players$: AngularFireList<any[]>;

  constructor(private http: HttpClient, private af: AngularFireDatabase) {
  }

  getPlayers() {
    this.players$ = this.af.list('/data/players');
    return this.players$.valueChanges().pipe(
      tap((res: any) => {
        this.players = res;
      })
    );
  }

  addPlayer(player) {
    this.players$.push(player);
  }

  getPlayersList() {
    const playerList: Array<String> = [];
    this.players.forEach(player => {
      playerList.push(player.name);
    });
    return playerList;
  }

  updateBatsmanList(newScores: BatsmanScore[]) {
    this.players.forEach(player => {
      const pl = newScores.find(el => {
        return el.name === player.name;
      });
      if (pl) {
        player.match++;
        player.batting.ball += pl.ball;
        player.batting.run += pl.run;
        player.batting.fours += pl.fours;
        player.batting.dots += pl.dots;
        player.batting.sixes += pl.sixes;
        player.batting.strikeRate = +this.calculateStrikeRate(
          player.batting.run,
          player.batting.ball
        );
      }
    });
  }

  updateBowlerList(newScores: BowlerScore[]) {
    this.players.forEach(player => {
      const pl = newScores.find(el => {
        return el.name === player.name;
      });
      if (pl) {
        player.bowling.over += pl.over;
        player.bowling.run += pl.run;
        player.bowling.fours += pl.fours;
        player.bowling.dots += pl.dots;
        player.bowling.sixes += pl.sixes;
        player.bowling.ball += pl.ball;
        player.bowling.economyRate = +this.calculateEcon(
          player.bowling.run,
          player.bowling.over,
          player.bowling.ball
        );
      }
    });
  }

  calculateStrikeRate(run, ball) {
    const sr = +((run / ball) * 100).toFixed(2);
    if (!isFinite(sr)) {
      return 0;
    } else {
      return sr;
    }
  }

  calculateEcon(run, over, ball) {
    return (run / ((over * 6 + ball) / 6)).toFixed(2);
  }

  updatePlayerList() {
    this.http
      .put(
        'https://scorer-56f42.firebaseio.com/data/players.json',
        this.players
      )
      .subscribe();
  }
}
