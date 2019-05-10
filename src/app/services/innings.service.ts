import { Injectable } from '@angular/core';
import { InningsCard, BatsmanScore, BowlerScore } from '../model/score';

@Injectable({
  providedIn: 'root'
})
export class InningsService {
  innings = new InningsCard();
  constructor() { }

  getInnigsCard() {
    return this.innings;
  }

  setInningsNumber(inningsNumber: number) {
    this.innings.inningsNumber = inningsNumber;
  }

  getActiveBatsmen() {
    this.innings.batting.filter((batsman: BatsmanScore) => {
      return batsman.active === true;
    });
  }

  getActiveBowler() {
    this.innings.bowling.filter((bowler: BowlerScore) => {
      return bowler.active === true;
    });
  }

  setNewBatsman(actBatsman: BatsmanScore) {
    this.innings.batting.push(actBatsman);
  }

  setNewBowler(actBowler: BowlerScore) {
    this.innings.bowling.push(actBowler);
  }
}
