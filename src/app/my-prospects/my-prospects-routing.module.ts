import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyProspectsPage } from './my-prospects.page';

const routes: Routes = [
  {
    path: '',
    component: MyProspectsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyProspectsPageRoutingModule {}
