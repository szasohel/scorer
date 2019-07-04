import { Injectable } from '@angular/core';
import { InningsCard, BatsmanScore, BowlerScore } from '../model/score';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InningsService {
  innings: InningsCard;
  constructor() {}

  getInnigsCard() {
    return this.innings;
  }

  setInnigsCard(innings: InningsCard) {
    this.innings = innings;
  }

  getBowlerList() {
    return this.innings.bowling;
  }

  addBowler(bowler) {
    this.innings.bowling.push(bowler);
  }

  addBatsman(batsman) {
    this.innings.batting.push(batsman);
  }

  addInningsTotal(inNum, runs, overs, wickets, ball) {
    this.innings = new InningsCard(inNum);
    this.innings.total.ball = ball;
    this.innings.total.run = runs;
    this.innings.total.over = overs;
    this.innings.total.wicket = wickets;
  }
}
