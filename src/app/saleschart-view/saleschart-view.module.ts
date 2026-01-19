import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaleschartViewPageRoutingModule } from './saleschart-view-routing.module';

import { SaleschartViewPage } from './saleschart-view.page';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  imports: [
    NgApexchartsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SaleschartViewPageRoutingModule
  ],
  declarations: [SaleschartViewPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class SaleschartViewPageModule {}
