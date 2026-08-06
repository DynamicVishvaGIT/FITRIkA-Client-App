import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindTrainerPage } from './find-trainer.page';

const routes: Routes = [
  {
    path: '',
    component: FindTrainerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindTrainerPageRoutingModule {}
