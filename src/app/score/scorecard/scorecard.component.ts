import { BatsmanScore, InningsCard } from 'src/app/model/score';
import { Component, OnInit } from '@angular/core';
import { InningsService } from 'src/app/services/innings.service';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'out', 'run', 'ball', 'fours', 'sixes'];
  dataSource;
  constructor(private inningsService: InningsService) {
    this.inningsService.inningsCardSubject.subscribe((res: InningsCard) => {
      console.log(res);
      this.dataSource = res.batting;
      console.log(this.dataSource);
    });
    // this.dataSource = this.inningsService.innings.batting;
    // this.dataSource = [
    //   { name: 'arafat', bowler: 'abu', run: 25, ball: 15, fours: 2, sixes: 1 }
    // ];
  }

  ngOnInit() {}
}
