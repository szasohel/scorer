import { Injectable } from '@angular/core';
import { ScoreCard } from '../model/score';

@Injectable({
  providedIn: 'root'
})
export class ScoreCardService {
  scorecard: ScoreCard;
  constructor() { }
}
