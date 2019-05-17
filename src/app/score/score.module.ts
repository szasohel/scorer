import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreRoutingModule } from './score-routing.module';
import { ScoreComponent } from './score.component';
import { BatsmanComponent } from './batsman/batsman.component';
import { ExtraComponent } from './extra/extra.component';
import { BowlerComponent } from './bowler/bowler.component';
import { RunsComponent } from './runs/runs.component';
import { ExRunsComponent } from './ex-runs/ex-runs.component';
import { WicketsComponent } from './wickets/wickets.component';
import { AddBowlerComponent } from './add-bowler/add-bowler.component';
import { LiveScoreComponent } from './live-score/live-score.component';
import { ScorecardComponent } from './scorecard/scorecard.component';
import { SecPlayerSelectionComponent } from './sec-player-selection/sec-player-selection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ScoreComponent,
    BatsmanComponent,
    ExtraComponent,
    BowlerComponent,
    RunsComponent,
    ExRunsComponent,
    WicketsComponent,
    AddBowlerComponent,
    LiveScoreComponent,
    ScorecardComponent,
    SecPlayerSelectionComponent,
  ],
  imports: [
    CommonModule,
    ScoreRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class ScoreModule { }
