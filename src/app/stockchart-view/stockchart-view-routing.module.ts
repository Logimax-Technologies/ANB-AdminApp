import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockchartViewPage } from './stockchart-view.page';

const routes: Routes = [
  {
    path: '',
    component: StockchartViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockchartViewPageRoutingModule {}
