import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindYourTrainerPageRoutingModule } from './find-your-trainer-routing.module';

import { FindYourTrainerPage } from './find-your-trainer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindYourTrainerPageRoutingModule
  ],
  declarations: [FindYourTrainerPage]
})
export class FindYourTrainerPageModule {}
