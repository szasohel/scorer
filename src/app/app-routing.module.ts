import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamSelectionComponent } from './team-selection/team-selection.component';
import { TossComponent } from './toss/toss.component';
import { ScoreComponent } from './score/score.component';
import { HomeComponent } from './home/home.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { AuthenticationGuardService } from './services/authentication-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'scorer', component: TeamSelectionComponent, canActivate: [AuthenticationGuardService] },
  { path: 'players', component: PlayerDetailsComponent },
  { path: 'toss', component: TossComponent, canActivate: [AuthenticationGuardService] },
  { path: 'score', component: ScoreComponent, canActivate: [AuthenticationGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
