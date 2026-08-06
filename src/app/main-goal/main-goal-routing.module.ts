import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainGoalPage } from './main-goal.page';

const routes: Routes = [
  {
    path: '',
    component: MainGoalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainGoalPageRoutingModule {}
