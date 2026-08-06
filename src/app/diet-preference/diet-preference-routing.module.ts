import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DietPreferencePage } from './diet-preference.page';

const routes: Routes = [
  {
    path: '',
    component: DietPreferencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietPreferencePageRoutingModule {}
