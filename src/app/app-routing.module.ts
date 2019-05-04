import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamSelectionComponent } from './team-selection/team-selection.component';
import { TossComponent } from './toss/toss.component';
import { ScoreComponent } from './score/score.component';

const routes: Routes = [
  { path: '', component: TeamSelectionComponent },
  { path: 'toss', component: TossComponent },
  { path: 'score', component: ScoreComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
