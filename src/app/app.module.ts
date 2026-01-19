import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { register } from 'swiper/element/bundle';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { BillShowComponent } from './model/bill-show/bill-show.component';

import { FusionChartsModule } from 'angular-fusioncharts';

// Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// Load fusion theme
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { BranchShowComponent } from './model/branch-show/branch-show.component';
import { CustomerDetailsComponent } from './model/customer-details/customer-details.component';

FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme)


register();

@NgModule({
  declarations: [AppComponent,BillShowComponent,BranchShowComponent,CustomerDetailsComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,NgApexchartsModule,HttpClientModule,FormsModule,ReactiveFormsModule,IonicStorageModule.forRoot(),FusionChartsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
