import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NothingScheduledPageRoutingModule } from './nothing-scheduled-routing.module';

import { NothingScheduledPage } from './nothing-scheduled.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NothingScheduledPageRoutingModule
  ],
  declarations: [NothingScheduledPage]
})
export class NothingScheduledPageModule {}
