import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { BillApprovePage } from '../bill-approve/bill-approve.page';


const routes: Routes = [
  {path: '',component: HomePage},
  {path: 'home1',component: HomePage}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
