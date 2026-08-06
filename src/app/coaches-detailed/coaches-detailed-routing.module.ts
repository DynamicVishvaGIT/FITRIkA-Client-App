import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoachesDetailedPage } from './coaches-detailed.page';

const routes: Routes = [
  {
    path: '',
    component: CoachesDetailedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoachesDetailedPageRoutingModule {}
