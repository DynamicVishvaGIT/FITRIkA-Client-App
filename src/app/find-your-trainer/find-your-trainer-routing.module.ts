import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindYourTrainerPage } from './find-your-trainer.page';

const routes: Routes = [
  {
    path: '',
    component: FindYourTrainerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindYourTrainerPageRoutingModule {}
