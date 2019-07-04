import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreRoutingModule } from './score-routing.module';
import { ScoreComponent } from './score.component';
import { AddBowlerComponent } from './add-bowler/add-bowler.component';
import { LiveScoreComponent } from './live-score/live-score.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddBatsmanComponent } from './add-batsman/add-batsman.component';

@NgModule({
  declarations: [
    ScoreComponent,
    AddBowlerComponent,
    LiveScoreComponent,
    AddBatsmanComponent
  ],
  imports: [
    CommonModule,
    ScoreRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class ScoreModule { }
