import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskDetailScreenPageRoutingModule } from './task-detail-screen-routing.module';

import { TaskDetailScreenPage } from './task-detail-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskDetailScreenPageRoutingModule
  ],
  declarations: [TaskDetailScreenPage]
})
export class TaskDetailScreenPageModule {}
