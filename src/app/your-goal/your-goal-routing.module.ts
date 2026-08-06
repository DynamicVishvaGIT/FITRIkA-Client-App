import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourGoalPage } from './your-goal.page';

const routes: Routes = [
  {
    path: '',
    component: YourGoalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourGoalPageRoutingModule {}
