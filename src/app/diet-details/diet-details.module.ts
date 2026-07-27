import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DietDetailsPageRoutingModule } from './diet-details-routing.module';

import { DietDetailsPage } from './diet-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DietDetailsPageRoutingModule
  ],
  declarations: [DietDetailsPage]
})
export class DietDetailsPageModule {}
