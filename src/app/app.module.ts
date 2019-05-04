import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamSelectionComponent } from './team-selection/team-selection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TossComponent } from './toss/toss.component';
import { ScoreComponent } from './score/score.component';
import { BatsmanComponent } from './score/batsman/batsman.component';
import { ExtraComponent } from './score/extra/extra.component';
import { BowlerComponent } from './score/bowler/bowler.component';
import { RunsComponent } from './score/runs/runs.component';
import { ExRunsComponent } from './score/ex-runs/ex-runs.component';
import { WicketsComponent } from './score/wickets/wickets.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamSelectionComponent,
    TossComponent,
    ScoreComponent,
    BatsmanComponent,
    ExtraComponent,
    BowlerComponent,
    RunsComponent,
    ExRunsComponent,
    WicketsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
