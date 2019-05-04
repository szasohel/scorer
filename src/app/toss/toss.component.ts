import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-toss',
  templateUrl: './toss.component.html',
  styleUrls: ['./toss.component.scss']
})
export class TossComponent implements OnInit {
  teams = ['Team Red', 'Team Green'];
  parts = ['Batting', 'Bowling'];
  toss: FormControl;
  tossWinner: any;
  partSelection: any;
  showSelection: boolean;
  tossSelection: FormControl;
  constructor() {}

  ngOnInit() {
    this.toss = new FormControl();
    this.tossSelection = new FormControl();
    this.toss.valueChanges.subscribe(res => {
      this.tossWinner = res;
      this.showSelection = true;
    });
    this.tossSelection.valueChanges.subscribe(res => {
      if (res === 'Batting') {
        this.partSelection = 'bat';
      } else if (res === 'Bowling') {
        this.partSelection = 'bowl';
      }
    });
  }
}
