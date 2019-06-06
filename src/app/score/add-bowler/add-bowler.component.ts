import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/services/score.service';
import { FormControl } from '@angular/forms';
import { InningsService } from 'src/app/services/innings.service';
import { BowlerScore } from 'src/app/model/score';

@Component({
  selector: 'app-add-bowler',
  templateUrl: './add-bowler.component.html',
  styleUrls: ['./add-bowler.component.scss']
})
export class AddBowlerComponent implements OnInit {
  bowlingSidePlayers: any;
  strikeBowler: FormControl;

  constructor(
    private scoreService: ScoreService,
    private inningsServie: InningsService
  ) { }

  ngOnInit() {
    this.bowlingSidePlayers = this.scoreService.bowlingSidePlayers.filter((el) => {
      return el !== this.scoreService.bowler.name;
    });
    this.strikeBowler = new FormControl();
  }
  onStartScoring() {
    this.scoreService.bowlerChangeSubject.next(false);
    const isBowler = this.inningsServie
      .getBowlerList()
      .find((bowler: BowlerScore) => {
        return bowler.name === this.strikeBowler.value;
      });
    if (isBowler) {
      isBowler.active = true;
      this.inningsServie.setNewBowler(isBowler);
    } else {
      this.inningsServie.setNewBowler(new BowlerScore(this.strikeBowler.value));
    }
    this.strikeBowler.reset();
  }
}
