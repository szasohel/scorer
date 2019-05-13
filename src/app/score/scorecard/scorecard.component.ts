import { BatsmanScore, InningsCard } from 'src/app/model/score';
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { InningsService } from 'src/app/services/innings.service';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable) batsmanTable: MatTable<any>;
  @ViewChild('bowler') bowlerTable: MatTable<any>;

  displayedColumns: string[] = ['name', 'out', 'run', 'ball', 'fours', 'sixes'];
  displayedColumnsBowler: string[] = ['name', 'over', 'run', 'fours', 'sixes'];
  dataSourceBatsman = this.inningsService.innings.batting;
  dataSourceBowler = this.inningsService.innings.bowling;
  innings: InningsCard = this.inningsService.innings;
  constructor(
    private inningsService: InningsService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.inningsService.inningsCardSubject.subscribe((res: InningsCard) => {
      this.changeDetectorRefs.detectChanges();
      this.innings = res;
      this.dataSourceBatsman = res.batting;
      this.dataSourceBowler = res.bowling;
      console.log(res.bowling);
      this.batsmanTable.renderRows();
      this.bowlerTable.renderRows();
    });
    // this.inningsService.inningsCardSubject.subscribe((res: InningsCard) => {
    //   this.dataSourceBowler = res.bowling;
    //   this.changeDetectorRefs.detectChanges();
    // });
    // this.dataSourceBatsman = this.inningsService.innings.batting;
    // this.dataSourceBowler = [
    //   {
    //     name: 'arafat',
    //     run: 25,
    //     over: 15,
    //     fours: 2,
    //     sixes: 1,
    //     dots: 0
    //   }
    // ];
  }

  ngOnDestroy() {
    this.changeDetectorRefs.detach();
  }
}
