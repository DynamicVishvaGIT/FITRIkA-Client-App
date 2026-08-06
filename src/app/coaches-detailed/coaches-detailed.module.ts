import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoachesDetailedPageRoutingModule } from './coaches-detailed-routing.module';

import { CoachesDetailedPage } from './coaches-detailed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoachesDetailedPageRoutingModule
  ],
  declarations: [CoachesDetailedPage]
})
export class CoachesDetailedPageModule {}
