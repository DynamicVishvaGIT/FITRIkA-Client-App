import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoachesDetailsPageRoutingModule } from './coaches-details-routing.module';

import { CoachesDetailsPage } from './coaches-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoachesDetailsPageRoutingModule
  ],
  declarations: [CoachesDetailsPage]
})
export class CoachesDetailsPageModule {}
