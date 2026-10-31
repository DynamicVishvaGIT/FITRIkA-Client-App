import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyProspectsPageRoutingModule } from './my-prospects-routing.module';

import { MyProspectsPage } from './my-prospects.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyProspectsPageRoutingModule
  ],
  declarations: [MyProspectsPage]
})
export class MyProspectsPageModule {}
