import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScoreComponent } from './score.component';
import { TossComponent } from '../toss/toss.component';
import { TeamSelectionComponent } from '../team-selection/team-selection.component';
import { AuthenticationGuardService } from '../services/authentication-guard.service';

const routes: Routes = [
  { path: '', component: TeamSelectionComponent },
  { path: 'toss', component: TossComponent },
  { path: 'score', component: ScoreComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoreRoutingModule { }
