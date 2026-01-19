import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavParams, Platform, PopoverController } from '@ionic/angular';
import { Common1Service } from 'src/service/common1.service';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { BillShowComponent } from '../model/bill-show/bill-show.component';
import { AppComponent } from '../app.component';
import { Storage } from '@ionic/storage-angular';
import { CustomerDetailsComponent } from '../model/customer-details/customer-details.component';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-bill-approve',
  templateUrl: './bill-approve.page.html',
  styleUrls: ['./bill-approve.page.scss'],
})

export class BillApprovePage implements OnInit  {
option:any
types:any
responsedata:any =[]
responsedata1:any =[]
esti_type:any
loading:any
bill_type:any ={'approval_type':'','id_branch':'','report_type':''}
empdata:any
receivedData:any

rate:any = true
wt:any = false
sale:any = false
pur:any = false


message = 'This modal example uses the modalController to present and dismiss modals.';

async ngOnInit() {
  await this.storage.create();
console.log('on init');
}

branch_id:any
report_type:any = 1
from:any;
to:any;
day:any='today'
day1:any='today'
date1:any={'from':'','to':''}
from_date:any = {'Glance_branch':'',"Selling_branch":"","SalesComparison_branch":"","BestSellers_branch":"","Stock_Chart":"","Month_Sales":'','StoreWiseSales':'','BranchWiseCompersion':'','Estimation':'','financial':'','employee_chart':'','section_chart':''};
to_date:any = {'Glance_branch':'',"Selling_branch":"","SalesComparison_branch":"","BestSellers_branch":"","Stock_Chart":"","Month_Sales":'','StoreWiseSales':'','BranchWiseCompersion':'','Estimation':'','financial':'','employee_chart':'','section_chart':''};
type:any ='Wastage'
color_mode:any

  constructor(private popoverController: PopoverController,public alertCtrl: AlertController,private toastController: ToastController,private route: ActivatedRoute,private storage: Storage,public app1:AppComponent,public router: Router,public common:Common1Service,private loadingController: LoadingController,public platform: Platform,private modalCtrl: ModalController) {

   }

   async ionViewWillEnter() {

    this.color_mode =await this.storage.get('color')
    console.log( this.color_mode,'mode');
    var date = new Date();
	  // var ddd = date.getDate();
	  var mmm = date.getMonth() + 1;
	  var yy = date.getFullYear();
    var day = date.getDate().toString().padStart(2, '0');
	  // var today = date.toISOString().substring(0, 10);
	  // this.to = yy+"-"+mmm+"-"+ddd;
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
	  this.to = yy+"-"+month+"-"+day;
    console.log(this.to);

/* 	they are said data's show only for current day.. it's now 1 month showing this code

  // var ddd = date.getDate();
	  var mmm = date.getMonth() == 0 ? 12 : date.getMonth();
	  var yy =  date.getMonth() == 0 ? date.getFullYear() - 1 : date.getFullYear();
	  // var today = date.toISOString().substring(0, 10);
	  // this.from = yy+"-"+mmm+"-"+ddd;
    var day = date.getDate().toString().padStart(2, '0'); */


	  this.from = yy+"-"+month+"-"+day;
    console.log( this.from);
    this.from_date['Glance_branch'] =this.from
    this.to_date['Glance_branch'] = this.to
    console.log( this.app1.login_type,'k');
    this.receivedData = this.common.getData();
    console.log( this.receivedData,'k');
    if(this.app1.login_type != undefined){
    this.esti_type=String(this.app1.login_type)
    console.log(this.esti_type);
    }else if(this.receivedData != undefined){
      this.esti_type =String(this.receivedData['type'])
    }
    else{
      this.esti_type='1'
    console.log(this.esti_type);

    }
    let empData = JSON.parse(await this.storage.get('empDetail'));
    console.log(empData,'emp');
    // this.branch_list['name']= empData['branch_name']
    this.branch_id= empData['branch_id']
    this.get_coverupreport()
    this.change_option(this.esti_type)
    console.log('ionViewWillEnter event fired');


  }



  // ionViewWillLeave() {
  //   console.log('ionViewWillLeave event fired');
  // }

  // ionViewDidEnter() {
  //   console.log('ionViewDidEnter event fired');
  // }

  // ionViewDidLeave() {
  //   console.log('ionViewDidLeave event fired');
  // }
 async get_coverupreport(){
  this.empdata = JSON.parse(await this.storage.get('empDetail'))
  console.log(this.empdata,'f');

    this.common.getApprovalType().subscribe(data=>{
      console.log(data,'Response data');
       this.types = data['approvaltypes'];
        });
  }


  async getApprovetype_detail(data:any){
    this.responsedata = []
    console.log(this.app1.login_type,'type');
    if(this.app1.login_type != undefined){
      this.bill_type['approval_type'] = this.app1.login_type
      this.bill_type['id_branch'] = this.branch_id
    }else{
      this.bill_type['approval_type'] = data
      this.bill_type['id_branch'] = this.branch_id
    }
    console.log(this.bill_type,'data');
    this.loading = await this.loadingController.create({
      message: 'Loading...',
      // duration: 3000,
      spinner: 'circles'
    });
    await this.loading.present();
    if(this.bill_type['approval_type'] == '4'){
      this.bill_type['from_date'] = this.date1['from']
      this.bill_type['to_date'] = this.date1['to']
    }else if(this.bill_type['approval_type'] == '5'){
      if(this.type == 'Wastage'){
        this.bill_type['approval_for'] = '0'
      }else if(this.type == 'Stone'){
        this.bill_type['approval_for'] = '1'
      }
      this.get_karigerdetails(this.bill_type['approval_for'])


    }
    console.log(this.responsedata,'response');
    this.bill_type['report_type'] = this.report_type
    this.common.getApprovalType_id(this.bill_type).subscribe(async data=>{
      this.app1.login_type = undefined
      if(data != null){
        console.log(data,'Response data');
         if(this.bill_type['approval_type'] != '4' && this.bill_type['approval_type'] != '5'){
          data.forEach((element:any) => {
            element['toggle'] = false
            if(element['bt_details'] != ''){
              element['bt_details']['net_wt'] =  parseFloat(element['bt_details']['net_wt']).toFixed(2)
            }else if(element['bt_details'] == ''){
              const formatter:any = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
              const value = 200000
              formatter.format(value) ;
              element['apprl_tot_bill_amount'] = formatter.format(element['apprl_tot_bill_amount'])
              // element['profit_amount'] = formatter.format(element['profit_amount'])
              element['profit_percentage'] = element['profit_percentage'] === '0.00' ? '' : element['profit_percentage'];
              element['profit_amount'] = element['profit_amount'] === 0 ? '' :formatter.format(element['profit_amount']);

              element['apprl_cr_paid_amt'] = formatter.format(element['apprl_cr_paid_amt'])
              element['due_amount'] = formatter.format(element['due_amount'])
              element['cus_outstanding'] = formatter.format(element['cus_outstanding'])
              element['sales_details'].forEach((data1:any) => {
              data1['purchase_rate'] = data1['purchase_rate'] === 0 ? '' : formatter.format(data1['purchase_rate']);
              data1['per_grm_amount'] = data1['per_grm_amount'] === 0 ? '' : formatter.format(data1['per_grm_amount']);
              data1['discount'] = data1['discount'] === 0 ? '' : formatter.format(data1['discount']);
              data1['sale_amount'] = data1['sale_amount'] === 0 ? '' : formatter.format(data1['sale_amount']);
              data1['tag_purchase_cost'] = data1['tag_purchase_cost'] === 0 ? '' : formatter.format(data1['tag_purchase_cost']);
              data1['profit_amt'] = data1['profit_amt'] === 0 ? '' : formatter.format(data1['profit_amt']);
              data1['min_sale_value'] = data1['min_sale_value'] === 0 ? '' : formatter.format(data1['min_sale_value']);
              data1['pur_mc'] = data1['pur_mc'] === 0 ? '' :data1['pur_mc'] ;
              data1['profit_percentage'] = data1['profit_percentage'] === 0 ? '' :data1['profit_percentage'] ;

              // data1['purchase_rate'] = formatter.format(data1['purchase_rate'])
              // data1['per_grm_amount'] = formatter.format(data1['per_grm_amount'])
              // data1['discount'] = formatter.format(data1['discount'])
              // data1['sale_amount'] = formatter.format(data1['sale_amount'])
              // data1['tag_purchase_cost'] = formatter.format(data1['tag_purchase_cost'])
              // data1['profit_amt'] = formatter.format(data1['profit_amt'])
              // data1['min_sale_value'] = formatter.format(data1['min_sale_value'])
              /* Stone Details */
              data1['sale_stone'] = data1['sale_stone'] === '0' ? '' : formatter.format(data1['sale_stone']);
              data1['pur_stone'] = data1['pur_stone'] === '0' ? '' : formatter.format(data1['pur_stone']);
              data1['profit_stone'] = data1['profit_stone'] === '0.00' ? '' : formatter.format(data1['profit_stone']);
              data1['sale_diamond'] = data1['sale_diamond'] === '0' ? '' : formatter.format(data1['sale_diamond']);
              data1['pur_diamond'] = data1['pur_diamond'] === '0' ? '' : formatter.format(data1['pur_diamond']);
              data1['profit_diamond'] = data1['profit_diamond'] === '0.00' ? '' : formatter.format(data1['profit_diamond']);
              // data1['sale_stone'] = formatter.format(data1['sale_stone'])
              // data1['pur_stone'] = formatter.format(data1['pur_stone'])
              // data1['profit_stone'] = formatter.format(data1['profit_stone'])
              // data1['sale_diamond'] = formatter.format(data1['sale_diamond'])
              // data1['pur_diamond'] = formatter.format(data1['pur_diamond'])
              // data1['profit_diamond'] = formatter.format(data1['profit_diamond'])

              });
              element['purchase_details'].forEach((data1:any) => {
                data1['bill_amount'] = data1['bill_amount'] === 0 ? '' : formatter.format(data1['bill_amount']);
                data1['bill_rate_per_grm'] = data1['bill_rate_per_grm'] === 0 ? '' : formatter.format(data1['bill_rate_per_grm']);
                data1['pur_gross_val'] = data1['pur_gross_val'] === '0.000' ? '' : data1['pur_gross_val'];
                data1['pur_net_val'] = data1['pur_net_val'] === '0.000' ? '' : data1['pur_net_val'];
                data1['pur_less_wt'] = data1['pur_less_wt'] === '0.000' ? '' :  data1['pur_less_wt']
              })

            }

          });
         }else if(this.bill_type['approval_type'] == '4' || this.bill_type['approval_type'] == '5'){
          data.forEach((element:any) => {
            element['toggle'] = false
            console.log(element,'k');
          });
         }

        this.responsedata = data
        this.responsedata1 = data

        this.responsedata['']
      await this.loading.dismiss();
      }else{
        this.responsedata =[]
      await this.loading.dismiss();
      }
    console.log(this.responsedata,'response');

        });
  }




  async getApprovel_detail(data:any,status:any){
    console.log(data,'');

    this.loading = await this.loadingController.create({
      message: 'Loading...',
      // duration: 3000,
      spinner: 'circles'
    });
    let data1:any

console.log(this.bill_type['approval_for'],'p')
    if(this.esti_type != 4 && this.esti_type != 5 ){
      let index = this.responsedata.indexOf(data);
      console.log(index,'index');
      if (index !== -1) {
      this.responsedata.splice(index, 1);
        console.log(this.responsedata,'splice data');
        // this.responsedata = demo

    }

    let modified:any
    if(status == '1'){
      modified = 1
    }else{
      modified = 0
    }
    data1=
    {
      "apprl_status" : status,
      "approval_id" : data['approval_id'],
      "apprl_approved_by" : this.empdata['uid'],
      "apprl_type" : this.esti_type,
      "disc_amt" : data['bill_discount'],
      "is_disc_modified":modified,
      "branch_id":this.branch_id
  }
    }else if(this.esti_type == 4){
      data1=
      {
        "apprl_type" : this.esti_type,
        "req_data":data,
        "apprl_status" : status,
        "cancel_reason":this.remark,
        "apprl_approved_by" : this.empdata['uid']

    }
    }else if(this.esti_type == 5){
      data1=
      {
        "apprl_type" : this.esti_type,
        "req_data":data,
        "apprl_status" : status,
        "cancel_reason":'',
        "apprl_approved_by" : this.empdata['uid'],
        "approval_for":this.bill_type['approval_for']
    }
    console.log(data1,'j');

    }
    await this.loading.present();
    this.common.getApprovaldetails(data1).subscribe(async data=>{
      // this.presentToast(data['message'])
      console.log(data,'Response data');
      console.log(data['message'],'Response data');
      this.approvebill_data=[]
      await this.loading.dismiss();
      this.common.presentToast(data['message']);
      if(this.esti_type == 4 || this.esti_type == 5 ){
       this.getApprovetype_detail(this.esti_type)
      }

        });
  }




 change_option(data:any){
  console.log(this.esti_type,'p');
  console.log(data,'change data');
  this.approvebill_data=[]
 if(this.esti_type == 1){
  this.option = 'Bill'
  this.getApprovetype_detail(this.esti_type)
 }else if(this.esti_type == 2){
  this.option = 'Credit'
  this.getApprovetype_detail(this.esti_type)
 } else if(this.esti_type == 3){
  this.option = 'Branch'
  this.getApprovetype_detail(this.esti_type)
 }else if(this.esti_type == 4){
  this.option = 'Rate'
  this.getApprovetype_detail(this.esti_type)
 }else if(this.esti_type == 5){
  this.option = 'Kariger'
  this.getApprovetype_detail(this.esti_type)
 }
  }


  openpage(){
    this.router.navigate(['/home'])
  }


  getEstiByEstiNo(data:any) {
    this.common.getApprovaldetails(data['approval_id']).subscribe(async data=>{
      console.log(data,'Response data');
      let temp = JSON.parse(data[0]['item_details'])
      console.log(temp,'ff');

      // if (data.printURL != '') {
      //   console.log(data.printURL);
      //   this.downloadfile(data.printURL, data.esti_name);
      // }
    await this.loading.dismiss();
        });
    }



    async openModal1(temp:any) {
      this.loading = await this.loadingController.create({
        message: 'Loading...',
        // duration: 3000,
        spinner: 'circles'
      });
      const modal = await this.modalCtrl.create({
        component: CustomerDetailsComponent, componentProps: {
          data: temp // Pass the data object
        }

      });
      modal.present();

      const { data, role } = await modal.onWillDismiss();
      await this.loading.dismiss();

      if (role === 'confirm') {
        this.message = `Hello, ${data}!`;
      }
    }



 bill_title:any
  async openModal(temp:any) {
    this.get_billTitle(this.bill_type)
    temp['approve_type'] =  this.esti_type
    temp['approve_title'] = this.bill_title
    this.loading = await this.loadingController.create({
      message: 'Loading...',
      // duration: 3000,
      spinner: 'circles'
    });
    const modal = await this.modalCtrl.create({
      component: BillShowComponent, componentProps: {
        data: temp // Pass the data object
      }

    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    await this.loading.dismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  get_billTitle(data:any){
  if(data == 1){
    this.bill_title = 'Discount'
  }else if(data == 2){
    this.bill_title = 'Credit'
  }else if(data == 3){
    this.bill_title = 'Branch Transfer'
  }
  }


  public onKeyUp(event: any) {
    //const NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/;
    const NUMBER_REGEXP = /^[0-9]*$/;
    let newValue = event.target.value;
    let regExp = new RegExp(NUMBER_REGEXP);

    if (!regExp.test(newValue)) {
      event.target.value = newValue.slice(0, -1);
      return true;
    } else {
      return false;
    }
  }

  check(i:any,data:any){
    console.log(i,'details')
    console.log(data,'data')
  }

  get_disc(data:any){
   data['is_disc_modified'] ='1'
   console.log(data,'discount');

  }

/*   tog() {

    if (this.toggle == true) {
      this.toggle = false;
    }
    else {
      this.toggle = true;
    }
  } */

  tog(approval_id:any , i:any,close:any) {
    console.log(approval_id , i);
  //  this.toggle = i;

  this.responsedata.forEach((value:any, key:any) => {
    console.log(value);
    console.log(key);
    if(this.esti_type != 5 ){
      if(key ==  i && approval_id == value['approval_id'] && close == '2' ){
        value['toggle'] = true;
      }else{
        value['toggle'] = false;

      }
    }else{
      if(key ==  i && close == '2' ){
        value['toggle'] = true;
      }else{
        value['toggle'] = false;

      }
    }


/*     if(key ==  i && this.responsedata[key]['toggle'] == false){
      this.responsedata[key][key]['toggle'] = true;
    }
    else{
      this.responsedata[key][key]['toggle'] = false;
    } */
  });
  console.log(this.responsedata);

  }

  show(data:any){
    if(data == 'rate'){
      this.rate = true
      this.wt = false
      this.sale = false
      this.pur = false
    }else if(data == 'sale'){
      this.rate = false
      this.wt = false
      this.sale = true
      this.pur = false
    }else if(data == 'wt'){
      this.rate = false
      this.wt = true
      this.sale = false
      this.pur = false
    }else if(data == 'pur'){
      this.rate = false
      this.wt = false
      this.sale = false
      this.pur = true
    }
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 1000);
    this.change_option('')
  }

  isToastOpen = false;

  // async presentToast(msg:any) {
  //   const toast = await this.toastController.create({
  //     message: 'data successfully',
  //     duration: 3000000000,
  //     position: 'bottom',
  //   });

  //   await toast.present();
  // }


  clear(){

  }

  selected(){
    let approve_data={
      "req_data":'',
      "approved_status":'1',
      "cancel_reason":'',
      "apprl_approved_by":'loginid'
    }

  }

  get_date(data:any,type:any){
    if(data == 'today' ){

      var date = new Date();
      var mmm = date.getMonth() + 1;
      var yy = date.getFullYear();
      var day = date.getDate().toString().padStart(2, '0');
      let month = (date.getMonth() + 1).toString().padStart(2, '0');
      var to = yy+"-"+month+"-"+day;
      console.log(this.to);
      var from = yy+"-"+month+"-"+day;
      // this.formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear().toString().substr(-2)}` +'to' + `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear().toString().substr(-2)}` ;
      console.log( this.from);
      this.date1['from'] = from
      this.date1['to'] = to
      this.day ='today'
      this.getApprovetype_detail(this.esti_type)
      // if(type == 1){
      //   this.get_SalesGlance(this.branch_list3,this.date1)
      //   this.day ='today'
      // }else if(type == 2){
      //   this.get_financialstatus(this.branch_list3,this.date1)
      //   this.day1 ='today'
      // }

    }
    else if(data == 'yest'){
      var date = new Date();
      // this.selectedChip = data;
      var ddd = date.getDate();
      var mmm = date.getMonth() + 1;
      var yy = date.getFullYear();
      // var today = date.toISOString().substring(0, 10);
      // var to = `${yy}-${(mmm < 10 ? '0' : '') + mmm}-${(ddd < 10 ? '0' : '') + ddd}`
      // this.to = yy+"-"+mmm+"-"+ddd;

      date.setDate(date.getDate() - 1);
      var ddd = date.getDate();
      var mmm = date.getMonth() + 1;
      var yy =  date.getFullYear() ;
      // var today = date.toISOString().substring(0, 10);
      // this only fetched 1 month
      var from = `${yy}-${(mmm < 10 ? '0' : '') + mmm}-${(ddd < 10 ? '0' : '') + ddd}`;
      var to = from
      // this.from = yy+"-"+mmm+"-"+ddd;
      this.date1['from'] = from
      this.date1['to'] = to
      console.log(this.date1,'yes date');
      this.getApprovetype_detail(this.esti_type)
      this.day ='yesterday'
      // if(type == 1){
      //   this.get_SalesGlance(this.branch_list3,this.date1)
      //   this.day ='yesterday'
      // }else if(type == 2){
      //   this.day1 ='yesterday'
      //   this.get_financialstatus(this.branch_list3,this.date1)
      // }

    }
    else if(data == 'this_week'){

      const currentDate = new Date();
const currentDayOfWeek = currentDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

// Calculate the difference between the current day of the week and Monday
const diffFromMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;

// Get the date for Monday (start of the current week)
const mondayDate = new Date(currentDate);
mondayDate.setDate(currentDate.getDate() + diffFromMonday);

// Calculate the date for Sunday (end of the current week)
const sundayDate = new Date(mondayDate);
sundayDate.setDate(mondayDate.getDate() + 6);

// Format the dates as desired (e.g., "yyyy-mm-dd")
const formattedMondayDate = this.formatDate(mondayDate);
const formattedSundayDate = this.formatDate(sundayDate);

console.log("Start date of the current week (Monday):", formattedMondayDate);
console.log("End date of the current week (Sunday):", formattedSundayDate);

      this.date1['from'] = formattedMondayDate
      this.date1['to'] = formattedSundayDate
      console.log(this.date1,'month date');
      this.getApprovetype_detail(this.esti_type)
      this.day ='this Week'
      // if(type == 1){
      //   this.get_SalesGlance(this.branch_list3,this.date1)
      //   this.day ='Last Month'
      // }else if(type == 2){
      //   this.get_financialstatus(this.branch_list3,this.date1)
      //   this.day1 ='Last Month'
      // }
    }

    }

    formatDate(date:any) {
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }



    onDateChange_from(type:any) {
      console.log(this.from);
      console.log(type);
      this.closePopover()
      if(type == 'Glance_branch'){
        this.date1['from'] = this.from_date['Glance_branch']
        this.date1['to'] = this.to_date['Glance_branch']
        this.getApprovetype_detail(this.esti_type)
      }
    }


    approvebill_data:any=[]
    selected_data(item: any, event: any) {
      if (event.detail.checked) {
        // Checkbox is checked, add the item to the selectedItems array
        this.approvebill_data.push(item);
      } else {
        // Checkbox is unchecked, remove the item from the approvebill_data array
        const index = this.approvebill_data.findIndex((i:any) => i.rate_fix_id === item.rate_fix_id);
        if (index !== -1) {
          this.approvebill_data.splice(index, 1);
        }
      }
      console.log('Selected Items:', this.approvebill_data);
    }


    kariger_det:any=[]
    get_karigerdetails(data:any){
      let post_data={
        'approval_for':data
      }
      this.common.getkariger(post_data).subscribe(async res =>{
        console.log(res,'kkkkkk');
        this.kariger_det =res

      })
    }


    stone_type(data:any){
      this.type = data
      this.kariger_id=''
      this.change_option(this.esti_type)
    }

    kariger_id:any
    karigar_filter(){
      console.log(this.kariger_id,'type')
      console.log(this.responsedata1);
      this.responsedata = this.responsedata1.filter((item:any) => item['id_karigar'] == this.kariger_id);
      console.log(this.responsedata);
    if(this.kariger_id == undefined){
      this.responsedata = this.responsedata1
     }
    }
remark:any

    async presentAlert(heder: any, status: any) {
      if(heder === 'Confirm Cancel' && status ==='2'){
        const alert = await this.alertCtrl.create({
          header: heder,
          subHeader: 'Are you sure you want to Submit!',
          inputs: [
            {
              name: 'remark',
              type: 'textarea',
              cssClass: 'custom-textarea',
              placeholder: 'Enter remark (optional)',
              attributes: {
                rows: 4 // Specify the number of rows for the text area
              },

             // Apply a custom class for the textarea input
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Alert canceled');
              },
            },
            {
              text: 'OK',
              role: 'confirm',
              handler: async (data) => {
                const remark = data.remark || '';
                console.log(remark, 'remark');
                this.remark = remark
                this.getApprovel_detail(this.approvebill_data, status)
              }
            },
          ],
           // Apply a custom class for the entire alert
        });
      await alert.present();

      }else{
        this.remark =''
        const alert = await this.alertCtrl.create({
          header: heder,
          subHeader: 'Are you sure you want to Submit!',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Alert canceled');
              },
            },
            {
              text: 'OK',
              role: 'confirm',
              handler: () => {
                this.getApprovel_detail(this.approvebill_data, status)
              }
            },
          ],
           // Apply a custom class for the entire alert
        });
      await alert.present();

      }


    }

    async closePopover() {
      await this.popoverController.dismiss();
    }

}

// <ion-textarea label="Outline textarea" labelPlacement="floating" fill="outline" placeholder="Enter text"></ion-textarea>
