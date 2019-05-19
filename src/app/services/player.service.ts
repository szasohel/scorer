import { Injectable } from '@angular/core';
import { Player } from '../model/player';
import { Subject, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { BatsmanScore, BowlerScore } from '../model/score';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  selectedPlayerSubject = new Subject();

  players: Array<Player> = [];
  players$: any;
  // players: Array<Player> = [
  //   {
  //     name: 'ARAFAT',
  //     match: 0,
  //     id: 1,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   },
  //   {
  //     name: 'ABU ',
  //     match: 0,
  //     id: 2,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   },
  //   {
  //     name: 'ABID',
  //     match: 0,
  //     id: 3,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   },
  //   {
  //     name: 'BADSHA',
  //     match: 0,
  //     id: 4,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   },
  //   {
  //     name: 'FARUK',
  //     match: 0,
  //     id: 5,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   },
  //   {
  //     name: 'HASSAN',
  //     match: 0,
  //     id: 6,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   },
  //   {
  //     name: 'JEWEL',
  //     match: 0,
  //     id: 7,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   },
  //   {
  //     name: 'PIHAL',
  //     match: 0,
  //     id: 8,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   },
  //   {
  //     name: 'PARVEZ',
  //     match: 0,
  //     id: 9,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   },
  //   {
  //     name: 'RAKIB',
  //     match: 0,
  //     id: 10,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   },
  //   {
  //     name: 'RUPAK',
  //     match: 0,
  //     id: 11,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   },
  //   {
  //     name: 'RIZWAN',
  //     match: 0,
  //     id: 12,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   },
  //   {
  //     name: 'SHAKIL',
  //     match: 0,
  //     id: 13,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   },
  //   {
  //     name: 'SYFUL',
  //     match: 0,
  //     id: 14,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   },
  //   {
  //     name: 'TAZUL',
  //     match: 0,
  //     id: 15,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   },
  //   {
  //     name: 'WAHID',
  //     match: 0,
  //     id: 16,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   },
  //   {
  //     name: 'FAHAD',
  //     match: 0,
  //     id: 17,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   },
  //   {
  //     name: 'YOUSUF',
  //     match: 0,
  //     id: 18,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   },
  //   {
  //     name: 'SHAAN',
  //     match: 0,
  //     id: 19,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   },
  //   {
  //     name: 'SOHEL',
  //     match: 0,
  //     id: 20,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   },
  //   {
  //     name: 'USMAN',
  //     match: 0,
  //     id: 21,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   },
  //   {
  //     name: 'AZAD',
  //     match: 0,
  //     id: 22,
  //     batting: {
  //       run: 0,
  //       ball: 0,
  //       fours: 0,
  //       sixes: 0,
  //       dots: 0,
  //       strikeRate: 0
  //     },
  //     bowling: {
  //       over: 0,
  //       run: 0,
  //       wicket: 0,
  //       sixes: 0,
  //       fours: 0,
  //       dots: 0,
  //       economyRate: 0
  //     }
  //   }
  // ];

  constructor(private http: HttpClient, private af: AngularFireDatabase) {}

  getPlayers() {
    return this.af
      .list('/data/players')
      .valueChanges()
      .pipe(
        tap((res: any) => {
          this.players = res;
        })
      );
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
