import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HowDidPage } from './how-did.page';

const routes: Routes = [
  {
    path: '',
    component: HowDidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HowDidPageRoutingModule {}
