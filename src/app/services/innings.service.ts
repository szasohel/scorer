import { Injectable } from '@angular/core';
import { InningsCard, BatsmanScore, BowlerScore } from '../model/score';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InningsService {
  innings: InningsCard;
  activeBatsmenSubject = new Subject();
  activeBowlerSubject = new Subject();
  alradyBattedSubject = new Subject();
  inningsCardSubject = new Subject();
  constructor() { }

  getInnigsCard() {
    return this.innings;
  }

  setInnigsCard(innings: InningsCard) {
    this.innings = innings;
  }

  getActiveBatsmen() {
    return this.innings.batting.filter((batsman: BatsmanScore) => {
      return batsman.active === true;
    });
  }

  getActiveBowler() {
    return this.innings.bowling.find((bowler: BowlerScore) => {
      return bowler.active === true;
    });
  }

  getBowlerList() {
    return this.innings.bowling;
  }

  setNewBatsman(actBatsman: BatsmanScore) {
    const listName: Array<string> = [];
    this.innings.batting.push(actBatsman);
    this.inningsCardSubject.next(this.innings);
    console.log('i am call');
    this.activeBatsmenSubject.next(this.getActiveBatsmen());
  }

  setNewBowler(actBowler: BowlerScore) {
    const isBowler = this.innings.bowling.find((bowler: BowlerScore) => {
      return bowler.name === actBowler.name;
    });
    if (!isBowler) {
      this.innings.bowling.push(actBowler);
    }
    this.activeBowlerSubject.next(this.getActiveBowler());
    this.inningsCardSubject.next(this.innings);
  }
}
