import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCoachesPageRoutingModule } from './add-coaches-routing.module';

import { AddCoachesPage } from './add-coaches.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCoachesPageRoutingModule
  ],
  declarations: [AddCoachesPage]
})
export class AddCoachesPageModule {}
