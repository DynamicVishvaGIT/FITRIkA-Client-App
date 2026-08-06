import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentFitnessPage } from './current-fitness.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentFitnessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentFitnessPageRoutingModule {}
