import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskDetailScreenPage } from './task-detail-screen.page';

const routes: Routes = [
  {
    path: '',
    component: TaskDetailScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskDetailScreenPageRoutingModule {}
