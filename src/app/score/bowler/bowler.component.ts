import { BowlerScore } from './../../model/score';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bowler',
  templateUrl: './bowler.component.html',
  styleUrls: ['./bowler.component.scss']
})
export class BowlerComponent implements OnInit {
  @Input() bowler: BowlerScore;
  constructor() {}

  ngOnInit() {}
}
