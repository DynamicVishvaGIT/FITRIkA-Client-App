import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DietPreferencePageRoutingModule } from './diet-preference-routing.module';

import { DietPreferencePage } from './diet-preference.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DietPreferencePageRoutingModule
  ],
  declarations: [DietPreferencePage]
})
export class DietPreferencePageModule {}
