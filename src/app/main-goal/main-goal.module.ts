import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainGoalPageRoutingModule } from './main-goal-routing.module';

import { MainGoalPage } from './main-goal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainGoalPageRoutingModule
  ],
  declarations: [MainGoalPage]
})
export class MainGoalPageModule {}
