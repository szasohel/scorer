import { Subject } from 'rxjs';
import { ScoreCardService } from 'src/app/services/score-card.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-scorecard-list',
  templateUrl: './scorecard-list.component.html',
  styleUrls: ['./scorecard-list.component.scss']
})
export class ScorecardListComponent implements OnInit {
  date: FormControl;
  scoreCard: any = [];
  card;
  @ViewChild(MatTable) batsmanTable: MatTable<any>;
  @ViewChild('bowler') bowlerTable: MatTable<any>;

  displayedColumns: string[] = ['name', 'out', 'run', 'ball', 'fours', 'sixes'];
  displayedColumnsBowler: string[] = ['name', 'over', 'run', 'fours', 'sixes'];
  dataSourceBatsman;
  dataSourceBowler;
  dataSourceExtra;

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

  constructor(private scoreCardService: ScoreCardService) {}

  ngOnInit() {
    this.date = new FormControl();
  }

  onSearch() {
    this.scoreCardService
      .retrieveScoreCard(this.date.value)
      .valueChanges()
      .subscribe(res => {
        this.scoreCard = res;
      });
    console.log(this.scoreCard);
  }

  onSelectCard(card) {
    this.dataSourceBatsman = card.secondInnings.batting;
    this.dataSourceBowler = card.secondInnings.bowling;
    this.dataSourceExtra = [card.secondInnings.extra];
    this.firstdataSourceBatsman = card.firstInnings.batting;
    this.firstdataSourceBowler = card.firstInnings.bowling;
    this.firstdataSourceExtra = [card.firstInnings.extra];
    this.card = card;
    console.log(this.card);
  }
}
