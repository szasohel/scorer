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
import { AddBowlerComponent } from './score/add-bowler/add-bowler.component';
import { LiveScoreComponent } from './score/live-score/live-score.component';
import { ScorecardComponent } from './score/scorecard/scorecard.component';
import { SecPlayerSelectionComponent } from './score/sec-player-selection/sec-player-selection.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { environment } from 'src/environments/environment';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

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
    WicketsComponent,
    AddBowlerComponent,
    LiveScoreComponent,
    ScorecardComponent,
    SecPlayerSelectionComponent,
    PlayerDetailsComponent,
    HomeComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AngularFireDatabase, AngularFireAuth],
  bootstrap: [AppComponent],
  entryComponents: [SignInComponent]
})
export class AppModule { }
