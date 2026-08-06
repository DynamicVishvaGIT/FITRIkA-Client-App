import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindTrainerPageRoutingModule } from './find-trainer-routing.module';

import { FindTrainerPage } from './find-trainer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindTrainerPageRoutingModule
  ],
  declarations: [FindTrainerPage]
})
export class FindTrainerPageModule {}
