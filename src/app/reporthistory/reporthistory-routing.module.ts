import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporthistoryPage } from './reporthistory.page';

const routes: Routes = [
  {
    path: '',
    component: ReporthistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporthistoryPageRoutingModule {}
