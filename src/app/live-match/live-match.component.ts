import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-live-match',
  templateUrl: './live-match.component.html',
  styleUrls: ['./live-match.component.scss']
})
export class LiveMatchComponent implements OnInit, OnDestroy {
  batsman1: any;
  batsman2: any;
  bowler: any;
  extra: any;
  inningsNumber: any;
  totalScore: any;
  targetball: any;
  targetRun: any;
  subscription: Subscription;
  winner: any;
  date: any;
  constructor(private db: AngularFireDatabase) {
    this.subscription = this.db
      .list('/data/live')
      .valueChanges()
      .pipe(
        tap((res: any) => {
          console.log(res);
          if (res.length === 2) {
            this.winner = res[1];
            this.date = res[0];
          } else if (res.length > 2) {
            this.winner = '';
            this.batsman1 = this.findActiveBatsman(res[0])[0];
            this.batsman2 = this.findActiveBatsman(res[0])[1];
            this.bowler = this.findBowler(res[1]);
            this.extra = res[2];
            this.inningsNumber = res[3];
            this.totalScore = res[6];
            this.targetball = res[4];
            this.targetRun = res[5];
          }
        })
      )
      .subscribe();
  }

  ngOnInit() { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  findBowler(list) {
    if (list.length) {
      return list.find(el => {
        return (el.active === true);
      });
    }
  }

  findActiveBatsman(list) {
    console.log(list);
    if (list.length) {
      return list.filter(el => {
        return (el.active === true);
      });
    }
  }
}
