import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, NavParams } from '@ionic/angular';

import { BillApprovePageRoutingModule } from './bill-approve-routing.module';

import { BillApprovePage } from './bill-approve.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillApprovePageRoutingModule
  ],
  declarations: [BillApprovePage],
  providers: [NavParams
  ],
})
export class BillApprovePageModule {}
