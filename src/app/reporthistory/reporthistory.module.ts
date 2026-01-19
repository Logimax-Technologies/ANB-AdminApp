import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporthistoryPageRoutingModule } from './reporthistory-routing.module';

import { ReporthistoryPage } from './reporthistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporthistoryPageRoutingModule
  ],
  declarations: [ReporthistoryPage]
})
export class ReporthistoryPageModule {}
