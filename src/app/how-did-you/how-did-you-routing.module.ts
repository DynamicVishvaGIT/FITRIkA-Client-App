import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HowDidYouPage } from './how-did-you.page';

const routes: Routes = [
  {
    path: '',
    component: HowDidYouPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HowDidYouPageRoutingModule {}
