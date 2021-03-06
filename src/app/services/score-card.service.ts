import { Injectable } from '@angular/core';
import { ScoreCard, InningsCard } from '../model/score';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ScoreCardService {
  scorecardList: ScoreCard[] = [];
  scorecard: any;
  scoreCard$: AngularFireList<any[]>;
  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.scoreCard$ = this.db.list('/data/scorecardlist');
  }
  addScoreCard(): void {
    this.scoreCard$.push(this.scorecard);
  }

  retrieveScoreCard(date) {
    return this.db.list('/data/scorecardlist', ref =>
      ref.orderByChild('date').equalTo(date)
    );
  }

  addinnings(inn: InningsCard) {
    if (inn.inningsNumber === 1) {
      this.scorecard = new ScoreCard();
      this.scorecard.firstInnings = inn;
    } else if (inn.inningsNumber === 2) {
      this.scorecard.secondInnings = inn;
    } else {
      throw console.error('there is an error');
    }
  }
}
