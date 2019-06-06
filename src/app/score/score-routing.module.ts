import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScoreComponent } from './score.component';
import { TossComponent } from './toss/toss.component';
import { TeamSelectionComponent } from './team-selection/team-selection.component';
import { AuthenticationGuardService } from '../services/authentication-guard.service';
import { NavigationGuardService } from '../services/navigation-guard.service.';

const routes: Routes = [
  { path: '', component: TeamSelectionComponent, canActivate: [AuthenticationGuardService] },
  { path: 'toss', component: TossComponent, canActivate: [AuthenticationGuardService] },
  { path: 'score', component: ScoreComponent, canActivate: [AuthenticationGuardService], canDeactivate: [NavigationGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoreRoutingModule { }
