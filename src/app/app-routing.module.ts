import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { ScorecardListComponent } from './scorecard-list/scorecard-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'scorer', loadChildren: './score/score.module#ScoreModule' },
  { path: 'players', component: PlayerDetailsComponent },
  { path: 'scorecard', component: ScorecardListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
