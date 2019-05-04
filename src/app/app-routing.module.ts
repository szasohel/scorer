import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamSelectionComponent } from './team-selection/team-selection.component';

const routes: Routes = [
  { path: 'team-selection', component: TeamSelectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
