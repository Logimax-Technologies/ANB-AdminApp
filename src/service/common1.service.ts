// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root',
})
export class Common1Service {
  private _header = new HttpHeaders().set(
    'Content-Type',
    'application/x-www-form-urlencoded; charset=UTF-8'
  );

  isShowingLoader = false;
  loader: any;
  HAS_SEEN_TUTORIAL = "hasSeenTutorial";
  menu_option:any
  cmpShortName ='LMX'
  sharedData:any
  constructor(public httpClient: HttpClient,public loadingController: LoadingController,public storage: Storage,public toastController: ToastController) {}
  private getHeader() {
    return { headers: this._header };
  }

  // BaseAPIURL = 'https://retail.KLASindia.com/etail_v3/admin/index.php/';
  // BaseAPIURL = 'https://erp.lakshmanaacharison.in/klsontest/admin/index.php/';
  BaseAPIURL = 'https://www.anbgoldanddiamonds.com/staging/admin/index.php/';


  //  BaseAPIURL = 'https://192.168.1.51/atm/admin/index.php/'



  async showLoader() {
    if (!this.isShowingLoader) {
      this.isShowingLoader = true;
      this.loader = await this.loadingController.create({
        message: "Please wait",
      });
      return await this.loader.present();
    }
  }

  async stopLoader() {
    if (this.loader) {
      this.loader.dismiss();
      this.loader = null;
      this.isShowingLoader = false;
    }
  }

  setData(data: any) {
    this.sharedData = data;
    console.log(this.sharedData,'k');

  }

  getData() {
    console.log(this.sharedData,'y');
    return this.sharedData;
  }


  public getCusAppVersion(): Observable<any> {
    var d = new Date(),
    n = d.getTime()
    return this.httpClient.get(this.BaseAPIURL + 'admin_app_api/getVersion?&nocache=' + n);
  }

  async presentToast(message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      cssClass: 'my-toast'
    });
    toast.present();
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value:any) => {
      return value;
    });
  }

  public doLogin(data: any): Observable<any> {
    return this.httpClient.post(
      this.BaseAPIURL + 'admin_app_api/authenticate', data,this.getHeader()
    );
  }

  public async logout(): Promise<Observable<any>> {
    let empData = JSON.parse(await this.storage.get('empDetail'));
    console.log(empData,'empdata');
    return this.httpClient.post(
      this.BaseAPIURL +  'admin_app_api/logout', {'username':empData['username'],'status':0},this.getHeader()
    );
  }

  public topselling(data: any): Observable<any> {
    return this.httpClient.post(
      this.BaseAPIURL + 'admin_ret_dashboard_api/get_top_selling', data,this.getHeader()
    );
  }

  public topsellers(data: any): Observable<any> {
    return this.httpClient.post(
      this.BaseAPIURL + 'admin_ret_dashboard_api/get_top_sellers', data,this.getHeader()
    );
  }

  public getStockChart(data: any): Observable<any> {
    return this.httpClient.post(
      this.BaseAPIURL + 'admin_ret_dashboard_api/get_product_stock', data,this.getHeader()
    );
  }

  public getBranchCompare(data: any): Observable<any> {
    return this.httpClient.post(
      this.BaseAPIURL + 'admin_ret_dashboard_api/get_branch_compare', data,this.getHeader()
    );
  }

  public getEstimationStatus(data: any): Observable<any> {
    return this.httpClient.post(
      this.BaseAPIURL + 'admin_ret_dashboard_api/get_EstimationStatus', data,this.getHeader()
    );
  }

  public month(data: any): Observable<any> {
    return this.httpClient.post(
      this.BaseAPIURL + 'admin_ret_dashboard_api/get_monthly_sales_app', data,this.getHeader()
    );
  }

  public store(data: any): Observable<any> {
    return this.httpClient.post(
      this.BaseAPIURL + 'admin_ret_dashboard_api/get_store_sales', data,this.getHeader()
    );
  }

  public dashboard(data: any): Observable<any> {
    return this.httpClient.post(
      this.BaseAPIURL + 'admin_ret_dashboard_api/get_Sales_glance', data,this.getHeader()
    );
  }

  public coverupReport(data: any): Observable<any> {
    return this.httpClient.post(
      this.BaseAPIURL + 'admin_ret_dashboard_api/get_CoverUpReport', data,this.getHeader()
    );
  }

  public getFinacialStatus(data: any): Observable<any> {
    return this.httpClient.post(
      this.BaseAPIURL + 'admin_ret_dashboard_api/get_FinancialStatus', data,this.getHeader()
    );
  }

  public getEmployeeSales(data: any): Observable<any> {
    return this.httpClient.post(
      this.BaseAPIURL + 'admin_ret_dashboard_api/get_employee_sales', data,this.getHeader()
    );
  }

  public getCustomerSales(data: any): Observable<any> {
    return this.httpClient.post(
      this.BaseAPIURL + 'admin_ret_dashboard_api/get_custome_wise_sale', data,this.getHeader()
    );
  }

  public getSectionSales(data: any): Observable<any> {
    return this.httpClient.post(
      this.BaseAPIURL + 'admin_ret_dashboard_api/get_section_sales', data,this.getHeader()
    );
  }

  public getApprovalType(): Observable<any> {
    return this.httpClient.get(
      this.BaseAPIURL + 'admin_app_api/getApprovalTypes',this.getHeader()
    );
  }

  public getApprovalType_id(data: any): Observable<any> {
  //   let type={"approval_type" : data['type'],
  // "id_branch":data['id_branch']}
    console.log(data,'type');
    return this.httpClient.post(
      this.BaseAPIURL + 'admin_app_api/getApprovallists', data,this.getHeader()
    );
  }

  public getApprovaldetails(data: any): Observable<any> {
    data['client'] = this.cmpShortName
    console.log(data,'post data');
    return this.httpClient.post(
      this.BaseAPIURL + 'admin_app_api/getApprovalStatus', data,this.getHeader()
    );
  }




  public getbranch(): Observable<any> {
    var d = new Date(),
    n = d.getTime()
    return this.httpClient.get(this.BaseAPIURL + 'admin_app_api/getBranchList?&nocache=' + n);
  }


  public getmetal(): Observable<any> {
    var d = new Date(),
    n = d.getTime()
    return this.httpClient.get(this.BaseAPIURL + 'admin_ret_dashboard_api/getActiveMetals?&nocache=' + n);
  }

  public fin(): Observable<any> {
    var d = new Date(),
    n = d.getTime()
    return this.httpClient.get(this.BaseAPIURL + 'admin_app_api/getFinancialYear?nocache=' + n);
  }

  public fin1(): Observable<any> {
    var d = new Date(),
    n = d.getTime()
    return this.httpClient.get(this.BaseAPIURL + 'admin_app_api/get_Financial_Year?nocache=' + n);
  }


  public metal(): Observable<any> {
    var d = new Date(),
    n = d.getTime()
    return this.httpClient.get(this.BaseAPIURL + 'admin_app_api/get_metal?nocache=' + n);
  }




  public getCustomer(data: any): Observable<any> {
    console.log(data,'post data');
    return this.httpClient.post(
      this.BaseAPIURL + 'admin_app_api/getCustomerDet', data,this.getHeader()
    );
  }

  public get_bill_print(data: any): Observable<any> {
    console.log(data,'post data');
    return this.httpClient.post(
      this.BaseAPIURL + 'admin_app_api/get_est_url', data,this.getHeader()
    );
  }

  public get_bt_bill_print(data: any): Observable<any> {
    console.log(data,'post data');
    return this.httpClient.post(
      this.BaseAPIURL + 'admin_app_api/get_bran_trans_url', data,this.getHeader()
    );
  }

  public get_cr_bill_print(data: any): Observable<any> {
    console.log(data,'post data');
    return this.httpClient.post(
      this.BaseAPIURL + 'admin_app_api/get_est_url', data,this.getHeader()
    );
  }



  public getkariger(data:any): Observable<any> {

    return this.httpClient.post(this.BaseAPIURL + 'admin_app_api/get_active_karigar',data,this.getHeader());
  }


  public Add_CoverUp(data: any): Observable<any> {
    return this.httpClient.post(
      this.BaseAPIURL + 'admin_app_api/add_cover_up', data,this.getHeader()
    );
  }

}
