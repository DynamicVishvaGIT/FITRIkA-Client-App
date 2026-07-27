import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HowDidYouPageRoutingModule } from './how-did-you-routing.module';

import { HowDidYouPage } from './how-did-you.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HowDidYouPageRoutingModule
  ],
  declarations: [HowDidYouPage]
})
export class HowDidYouPageModule {}
