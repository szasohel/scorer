import { Injectable } from '@angular/core';
import { InningsCard, BatsmanScore, BowlerScore } from '../model/score';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InningsService {
  innings: InningsCard;
  constructor() { }

  getInnigsCard() {
    return this.innings;
  }

  setInnigsCard(innings: InningsCard) {
    this.innings = innings;
  }

  getBowlerList() {
    return this.innings.bowling;
  }

}
