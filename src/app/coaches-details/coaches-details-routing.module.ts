import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoachesDetailsPage } from './coaches-details.page';

const routes: Routes = [
  {
    path: '',
    component: CoachesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoachesDetailsPageRoutingModule {}
