import { Injectable } from '@angular/core';
import { ScoreCard } from '../../model/score';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScoreCardService {
  scorecardList: ScoreCard[] = [];
  scorecard: ScoreCard;
  constructor(private http: HttpClient) {

  }
  getScorecardList() {
    this.http.get('https://scorer-56f42.firebaseio.com/data/scorecardlist.json').subscribe((res: any) => {
      this.scorecardList = res;
    });
  }
  updateScoreCard() {
    this.scorecardList.push(this.scorecard);
    this.http.put('https://scorer-56f42.firebaseio.com/data/scorecardlist.json', this.scorecardList).subscribe();
  }
}
