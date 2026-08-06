import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourGoalPageRoutingModule } from './your-goal-routing.module';

import { YourGoalPage } from './your-goal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YourGoalPageRoutingModule
  ],
  declarations: [YourGoalPage]
})
export class YourGoalPageModule {}
