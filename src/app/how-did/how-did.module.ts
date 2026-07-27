import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HowDidPageRoutingModule } from './how-did-routing.module';

import { HowDidPage } from './how-did.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HowDidPageRoutingModule
  ],
  declarations: [HowDidPage]
})
export class HowDidPageModule {}
