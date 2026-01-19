import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillApprovePage } from './bill-approve.page';

const routes: Routes = [
  {
    path: '',
    component: BillApprovePage
  },

  { path: 'bill/:type',
  component: BillApprovePage}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillApprovePageRoutingModule {}
