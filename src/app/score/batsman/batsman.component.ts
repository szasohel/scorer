import { BatsmanScore } from './../../model/score';
import { ScoreService } from '../services/score.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-batsman',
  templateUrl: './batsman.component.html',
  styleUrls: ['./batsman.component.scss']
})
export class BatsmanComponent implements OnInit {
  @Input() batsman: BatsmanScore;

  constructor() { }

  ngOnInit() { }
}
