import { Injectable } from '@angular/core';
import { Player } from '../model/player';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  selectedPlayerSubject = new Subject();

  players: Array<Player> = [
    {
      name: 'ARAFAT',
      id: 1,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    },
    {
      name: 'ABU ',
      id: 2,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    },
    {
      name: 'ABID',
      id: 3,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    },
    {
      name: 'BADSHA',
      id: 4,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    },
    {
      name: 'FARUK',
      id: 5,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    },
    {
      name: 'HASSAN',
      id: 6,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    },
    {
      name: 'JEWEL',
      id: 7,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    },
    {
      name: 'PIHAL',
      id: 8,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    },
    {
      name: 'PARVEZ',
      id: 9,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    },
    {
      name: 'RAKIB',
      id: 10,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    },
    {
      name: 'RUPAK',
      id: 11,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    },
    {
      name: 'RIZWAN',
      id: 12,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    },
    {
      name: 'SHAKIL',
      id: 13,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    },
    {
      name: 'SYFUL',
      id: 14,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    },
    {
      name: 'TAZUL',
      id: 15,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    },
    {
      name: 'WAHID',
      id: 16,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    },
    {
      name: 'FAHAD',
      id: 17,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    },
    {
      name: 'YOUSUF',
      id: 18,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    },
    {
      name: 'SHAAN',
      id: 19,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    },
    {
      name: 'SOHEL',
      id: 20,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    },
    {
      name: 'USMAN',
      id: 21,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    },
    {
      name: 'AZAD',
      id: 22,
      batting: {
        run: 0,
        ball: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
        strikeRate: 0
      },
      bowling: {
        over: 0,
        run: 0,
        wicket: 0,
        sixes: 0,
        fours: 0,
        dots: 0,
        economyRate: 0
      }
    }
  ];

  constructor() {}

  getPlayersList() {
    const playerList: Array<String> = [];

    this.players.forEach(player => {
      playerList.push(player.name);
    });

    return playerList;
  }
}
