import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaleschartViewPage } from './saleschart-view.page';

const routes: Routes = [
  {
    path: '',
    component: SaleschartViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleschartViewPageRoutingModule {}
