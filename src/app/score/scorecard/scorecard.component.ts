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
import { ScoreCardService } from 'src/app/services/score-card.service';

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
  dataSourceExtra;
  dataSourceBowler = this.inningsService.innings.bowling;

  @ViewChild('firstbatsman') firstbatsmanTable: MatTable<any>;
  @ViewChild('firstbowler') firstbowlerTable: MatTable<any>;

  firstdisplayedColumns: string[] = [
    'name',
    'out',
    'run',
    'ball',
    'fours',
    'sixes'
  ];
  firstdisplayedColumnsBowler: string[] = [
    'name',
    'over',
    'run',
    'fours',
    'sixes'
  ];
  extraColumns: string[] = [
    'Total',
    'WD',
    'NB',
    'Bye',
    'Bye1',
    'Bye2',
    'Bye3',
    'Bye4'
  ];
  firstdataSourceBatsman;
  firstdataSourceBowler;
  firstdataSourceExtra;

  innings: InningsCard = this.inningsService.innings;
  firstinnings: InningsCard;
  isSecInnings: boolean;
  constructor(
    private inningsService: InningsService,
    private scorecardService: ScoreCardService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.inningsService.inningsCardSubject.subscribe((res: InningsCard) => {
      if (this.inningsService.innings.inningsNumber === 2) {
        this.changeDetectorRefs.detectChanges();
        this.firstinnings = this.scorecardService.scorecard.firstInnings;
        this.firstdataSourceBatsman = this.scorecardService.scorecard.firstInnings.batting;
        this.firstdataSourceBowler = this.scorecardService.scorecard.firstInnings.bowling;
        this.firstdataSourceExtra = [
          this.scorecardService.scorecard.firstInnings.extra
        ];

        this.batsmanTable.renderRows();
        this.bowlerTable.renderRows();
      }
      this.changeDetectorRefs.detectChanges();
      this.innings = res;
      this.dataSourceBatsman = [...res.batting];
      this.dataSourceBowler = [...res.bowling];
      this.dataSourceExtra = [...[res.extra]];
      this.batsmanTable.renderRows();
      this.bowlerTable.renderRows();
    });
  }

  ngOnDestroy() {
    this.changeDetectorRefs.detach();
  }
}
