import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCoachesPage } from './add-coaches.page';

const routes: Routes = [
  {
    path: '',
    component: AddCoachesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCoachesPageRoutingModule {}
