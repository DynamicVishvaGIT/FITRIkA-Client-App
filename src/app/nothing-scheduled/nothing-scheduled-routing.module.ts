import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NothingScheduledPage } from './nothing-scheduled.page';

const routes: Routes = [
  {
    path: '',
    component: NothingScheduledPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NothingScheduledPageRoutingModule {}
