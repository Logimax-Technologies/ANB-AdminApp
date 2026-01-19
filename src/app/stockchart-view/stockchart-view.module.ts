import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockchartViewPageRoutingModule } from './stockchart-view-routing.module';

import { StockchartViewPage } from './stockchart-view.page';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  imports: [
    CommonModule,
    NgApexchartsModule,
    FormsModule,
    IonicModule,
    StockchartViewPageRoutingModule
  ],
  declarations: [StockchartViewPage]
})
export class StockchartViewPageModule {}
