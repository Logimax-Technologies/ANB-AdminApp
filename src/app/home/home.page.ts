import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis } from 'ng-apexcharts';
import { filter } from 'rxjs';
import { Common1Service } from 'src/service/common1.service';
import Swiper from 'swiper';
import { AlertController, AnimationController, IonSpinner, LoadingController, ModalController, NavController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { BranchShowComponent } from '../model/branch-show/branch-show.component';
import { BillApprovePage } from '../bill-approve/bill-approve.page';
import { Storage } from '@ionic/storage-angular';
import { PopoverController } from '@ionic/angular';














export type ChartOptions = {
  chart: any;
  series: any;
  stroke: any;
  markers: any;
  grid: any;
  tooltip: any;
  colors: any;
  labels: any;
  xaxis: any;
  yaxis: any;
  title: any;
  subtitle: any;
  dataLabels: any;
  legend: any;
  fill: any;
  plotOptions: any;
  responsive:any;

};



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],

})





export class HomePage  {

  isDarkMode: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;

  chartData:any = [
    ['Label', 'Value'],
    ['Memory', 80],
    ['CPU', 55],
    ['Network', 68]
  ];

  chartOptionsss:any= {
    width: 400,
    height: 120,
    redFrom: 90,
    redTo: 100,
    yellowFrom: 75,
    yellowTo: 90,
    minorTicks: 5
  };



  showSpinner = true;
  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public dataLabels!: ApexDataLabels;
  public markers!: ApexMarkers;
  public title!: ApexTitleSubtitle;
  public fill!: ApexFill;
  public yaxis!: ApexYAxis;
  public xaxis!: ApexXAxis;
  public tooltip!: ApexTooltip;
  dataSource:any
  from:any;
	to:any;
  date1={'from':'','to':''}
  today = false
  today_fin = false
  color_mode:any
pending_position:any
empData_log:any
fin_metal1:any=[]
metal_id:any =1

  year_fin:any=['today','fin Year'
  ]

 // empData = JSON.parse(localStorage.getItem('empDetail'));
  empdata1={'Glance_branch':'','Selling_branch':'','SalesComparison_branch':'','BestSellers_branch':'','Stock_Chart':'','Month_Sales':'','Estimation_branch':'','financial':''}
  from_date:any = {'Glance_branch':'',"Selling_branch":"","SalesComparison_branch":"","BestSellers_branch":"","Stock_Chart":"","Month_Sales":'','StoreWiseSales':'','BranchWiseCompersion':'','Estimation':'','financial':'','employee_chart':'','section_chart':''};
  to_date:any = {'Glance_branch':'',"Selling_branch":"","SalesComparison_branch":"","BestSellers_branch":"","Stock_Chart":"","Month_Sales":'','StoreWiseSales':'','BranchWiseCompersion':'','Estimation':'','financial':'','employee_chart':'','section_chart':''};

  total:any

  public options!: Partial<ChartOptions>;
  public barOptions!: Partial<ChartOptions>;
  public areaOptions!: Partial<ChartOptions>;
  public radial!: Partial<ChartOptions>;
  public chartOptions!: Partial<ChartOptions>
  public chartOptions1!: Partial<ChartOptions>
  public bestsellers!: Partial<ChartOptions>
  public stockchart!: Partial<ChartOptions>
  public Estimation!: Partial<ChartOptions>
  public linechart!: Partial<ChartOptions>
  public Radialchart!: Partial<ChartOptions>
  public employeechart!: Partial<ChartOptions>
  public sectionchart!: Partial<ChartOptions>







  piexValues:any
  pieyValues:any;
  piebarColors:any=[];
  branch_list1:any=[];
  bpiexValues:any
  bpieyValues:any
  bpiebarColors:any;
  bbpiexValues:any;
  bbpieyValues:any;
  bbpiebarColors:any
  bar2xValues:any;
  bar2yValues:any;
  bar2barColors:any;
  emp_bbpiexValues:any;
  emp_bbpieyValues:any;
  emp_bbpiebarColors:any
  sec_bbpiexValues:any;
  sec_bbpieyValues:any;
  sec_bbpiebarColors:any
  estiStatus :any
  barxValues :any
  baryValues:any
  barbarColors:any
  linecolors:any
  lineValues:any
  coverupReport:any
  branch_id:any
	branch:any = [];
  dash :any = {};
  // empData:any
  empData={'Glance_branch':'','Selling_branch':'','SalesComparison_branch':'','BestSellers_branch':'','Stock_Chart':'','Month_Sales':'','Estimation_branch':'','financial':'','report':''}
  toggle:any=false

  root:any
  common_branch:any
  items:any[] = [];
  items1:any[] = [];
  fin = [];
  year:any
 branch_list={'name':'','id_branch':''}
 branch_list3:any=[]


 filter:any ={'top_branch':'','break_branch':''}
day:any='today'
day1:any='today'


popover1: HTMLIonPopoverElement | undefined;
popover2: HTMLIonPopoverElement | undefined;

//  chart =['myChart1','myChart3','myChart7','myChart9'];
 @ViewChild('swiper')
 swiperRef: ElementRef | undefined;
 swiper?: Swiper;
 // modify the segmentList based on your segment
 segmentList: Array<string> = ['All', 'Breakfast', 'Main Dish', 'Drinks'];
 selectedSegment:any



 loading:any
 selectedDate: string | Date | undefined;

    chartConfig: any;
    formattedDate:any
    yearly_status:any = 0


  constructor(public alertCtrl: AlertController,private popoverController: PopoverController,private storage: Storage,public router: Router,public common:Common1Service,private animationCtrl: AnimationController,private loadingController: LoadingController,public app:AppComponent,private modalCtrl: ModalController,public navCtrl: NavController) {





  }




  datePickerOptions: any = {
    buttons: [
      {
        text: 'Cancel',
        handler: () => {
          console.log('Cancelled');
        }
      },
      {
        text: 'Done',
        handler: () => {
          console.log('Selected');
        }
      }
    ],
    maxDate: new Date().toISOString(), // Set max date to today
    min: new Date().toISOString(), // Set min date to today
    max: new Date(new Date().getFullYear() + 1).toISOString(), // Set max selectable date to one year from now
    from: new Date().toISOString(), // Set the initial date to today
    to: new Date(new Date().getFullYear() + 1).toISOString(), // Set the initial max selectable date to one year from now
    displayFormat: 'MMM DD YYYY', // Display format of the selected date
    pickerFormat: 'MMM DD YYYY', // Picker format of the selected date
    pickerOptions: {
      buttons: [
        {
          text: 'Done',
          handler: () => {
            console.log('Done clicked');
          }
        }
      ]
    }
  };


  // get_branch(){
  //   this.common.getbranch().subscribe(res =>{
  //   console.log(res,'branch');
  //   this.branch_list1 = res
  //   console.log(this.branch_list1,'111111');
  //   });
  // }
  test:any;
  swiperSlideChanged(e: any,type:any) {
    this.test =  e.target.swiper.activeIndex
    if(type == 'top_selling'){
      console.log('changed: ', e);
      const index = e.target.swiper.activeIndex
      console.log(index,'kkkkkk');
      this.selectedSegment = this.branch_list1[index]
      console.log(this.selectedSegment,'lllll');
     let branch_inx = this.branch_list1.filter((element:any) => {
        return element.id_branch === this.selectedSegment.id_branch
      });
      console.log(branch_inx,'main indesx');
      this.common_branch = branch_inx
      if(branch_inx != '' && branch_inx != undefined){
      this.get_SalesPrdoucts(branch_inx,this.date1)
      }
    }else if(type == 'best_seller'){
      console.log('changed: ', e);
      const index = e.target.swiper.activeIndex
      console.log(index,'kkkkkk');
      this.selectedSegment = this.branch_list1[index]
      console.log(this.selectedSegment,'lllll');
     let branch_inx = this.branch_list1.filter((element:any) => {
        return element.id_branch === this.selectedSegment.id_branch
      });
      console.log(branch_inx,'main indesx');
      this.common_branch = branch_inx
      if(branch_inx != '' && branch_inx != undefined){
      this.get_BestSellers(branch_inx,this.date1)
      }
    }
    else if(type == 'financial'){
      console.log('changed: ', e);
      const index = e.target.swiper.activeIndex
      console.log(index,'kkkkkk');
      console.log(this.yearly_status,'l');
      this.yearly_status = index
      this.today_fin = true
      this.date1['from'] = this.from_date['financial']
      this.date1['to'] = this.to_date['financial']
      this.get_financialstatus(this.common_branch,this.date1)
    //   this.selectedSegment = this.branch_list1[index]
    //   console.log(this.selectedSegment,'lllll');
    //  let branch_inx = this.branch_list1.filter((element:any) => {
    //     return element.id_branch === this.selectedSegment.id_branch
    //   });
    //   console.log(branch_inx,'main indesx');
    //   this.common_branch = branch_inx
    //   if(branch_inx != '' && branch_inx != undefined){
    //   this.get_StockChart(branch_inx,this.date1)
    //   }
    }
    else if(type == 'employee_chart'){
      console.log('changed: ', e);
      const index = e.target.swiper.activeIndex
      console.log(index,'kkkkkk');
      this.selectedSegment = this.branch_list1[index]
      console.log(this.selectedSegment,'lllll');
     let branch_inx = this.branch_list1.filter((element:any) => {
        return element.id_branch === this.selectedSegment.id_branch
      });
      console.log(branch_inx,'main indesx');
      this.common_branch = branch_inx
      if(branch_inx != '' && branch_inx != undefined){
      this.get_EmployeeSale(branch_inx,this.date1)
      }
    }
    else if(type == 'section_chart'){
      console.log('changed: ', e);
      const index = e.target.swiper.activeIndex
      console.log(index,'kkkkkk');
      this.selectedSegment = this.branch_list1[index]
      console.log(this.selectedSegment,'lllll');
     let branch_inx = this.branch_list1.filter((element:any) => {
        return element.id_branch === this.selectedSegment.id_branch
      });
      console.log(branch_inx,'main indesx');
      this.common_branch = branch_inx
      if(branch_inx != '' && branch_inx != undefined){
      this.get_SectionSale(branch_inx,this.date1)
      }
    }


  }

  onDateChange_from(type:any) {
    console.log(this.from);
    console.log(type);
    this.closePopover()
    if(type == 'top_selling'){
      this.date1['from'] = this.from_date['Selling_branch']
      this.date1['to'] = this.to_date['Selling_branch']
      this.get_SalesPrdoucts(this.common_branch,this.date1)
    }else if(type == 'best_seller'){
      this.date1['from'] = this.from_date['BestSellers_branch']
      this.date1['to'] = this.to_date['BestSellers_branch']
      this.get_BestSellers(this.common_branch,this.date1)
    }
    else if(type == 'stock_chart'){
      this.date1['from'] = this.from_date['Stock_Chart']
      this.date1['to'] = this.to_date['Stock_Chart']
      this.get_StockChart(this.common_branch,this.date1)
    }
    else if(type == 'section_chart'){
      this.date1['from'] = this.from_date['section_chart']
      this.date1['to'] = this.to_date['section_chart']
      this.get_SectionSale(this.common_branch,this.date1)
    }
    else if(type == 'employee_chart'){
      this.date1['from'] = this.from_date['employee_chart']
      this.date1['to'] = this.to_date['employee_chart']
      this.get_EmployeeSale(this.common_branch,this.date1)
    }
    else if(type == 'BranchWiseCompersion'){
      this.date1['from'] = this.from_date['BranchWiseCompersion']
      this.date1['to'] = this.to_date['BranchWiseCompersion']
      this.get_BranchCompare(this.common_branch,this.date1)
    }
    else if(type == 'Estimation'){
      this.date1['from'] = this.from_date['Estimation']
      this.date1['to'] = this.to_date['Estimation']
      this.get_estimationstatus(this.common_branch,this.date1)
    }
    else if(type == 'StoreWiseSales'){
      this.date1['from'] = this.from_date['StoreWiseSales']
      this.date1['to'] = this.to_date['StoreWiseSales']
      this.get_StoreWiseSales(this.common_branch,this.date1)
    }
    else if(type == 'Glance_branch'){
      this.today = true
      this.date1['from'] = this.from_date['Glance_branch']
      this.date1['to'] = this.to_date['Glance_branch']
      this.get_SalesGlance(this.common_branch,this.date1)
    }
    else if(type == 'financial'){
      this.today_fin = true
      this.date1['from'] = this.from_date['financial']
      this.date1['to'] = this.to_date['financial']
      this.get_financialstatus(this.common_branch,this.date1)
    }else if(type == 'gold'){
      this.metal_id = 1
      this.get_coverupreport(this.common_branch)
    }else if(type == 'silver'){
      this.metal_id =2
      this.get_coverupreport(this.common_branch)
    }




  }

  onDateChange_to(type:any) {
   console.log(this.to);
   console.log(type);
   this.closePopover()
   this.date1['from'] = this.from
   this.date1['to'] = this.to
   if(type == 'top_selling'){
    this.date1['from'] = this.from_date['Selling_branch']
    this.date1['to'] = this.to_date['Selling_branch']
    this.get_SalesPrdoucts(this.common_branch,this.date1)
  }else if(type == 'best_seller'){
    this.date1['from'] = this.from_date['BestSellers_branch']
    this.date1['to'] = this.to_date['BestSellers_branch']
  this.get_BestSellers(this.common_branch,this.date1)
  }
  else if(type == 'stock_chart'){
    this.date1['from'] = this.from_date['Stock_Chart']
    this.date1['to'] = this.to_date['Stock_Chart']
    this.get_StockChart(this.common_branch,this.date1)
  }
  else if(type == 'section_chart'){
    this.date1['from'] = this.from_date['section_chart']
    this.date1['to'] = this.to_date['section_chart']
    this.get_SectionSale(this.common_branch,this.date1)
  }
  else if(type == 'employee_chart'){
    this.date1['from'] = this.from_date['employee_chart']
    this.date1['to'] = this.to_date['employee_chart']
    this.get_EmployeeSale(this.common_branch,this.date1)
  }
  else if(type == 'BranchWiseCompersion'){
    this.date1['from'] = this.from_date['BranchWiseCompersion']
    this.date1['to'] = this.to_date['BranchWiseCompersion']
    this.get_BranchCompare(this.common_branch,this.date1)
  }
  else if(type == 'Estimation'){
    this.date1['from'] = this.from_date['Estimation']
      this.date1['to'] = this.to_date['Estimation']
    this.get_estimationstatus(this.common_branch,this.date1)
  }
  else if(type == 'StoreWiseSales'){
    this.date1['from'] = this.from_date['StoreWiseSales']
    this.date1['to'] = this.to_date['StoreWiseSales']
    this.get_StoreWiseSales(this.common_branch,this.date1)
  }
  else if(type == 'Glance_branch'){
   this.today = true
    this.date1['from'] = this.from_date['Glance_branch']
    this.date1['to'] = this.to_date['Glance_branch']
    this.get_SalesGlance(this.common_branch,this.date1)
  }
  else if(type == 'financial'){
   this.today_fin = true
    this.date1['from'] = this.from_date['financial']
    this.date1['to'] = this.to_date['financial']
    this.get_financialstatus(this.common_branch,this.date1)
  }
 }

 formatDate(dateStr: string,datestr1: string): string {
  // Create a new Date object from the date string
  const date = new Date(dateStr);
  const date1 = new Date(datestr1);


  // Format the date in the desired format
  let from = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear().toString().substr(-2)}` +" to " ;
  let to =`${date1.getDate()}-${date1.getMonth() + 1}-${date1.getFullYear().toString().substr(-2)}`;
   const formattedDate =  from + to
  return formattedDate;
}


  get_SalesPrdoucts(branch:any,date:any){
    // this.empdata1['Selling_branch'] = branch.name;

   this.empData = branch[0].id_branch
    this.to_date['Selling_branch'] = date['to']
    this.from_date['Selling_branch'] = date['from']

    this.common.topselling({"id_branch":0,"from_date":this.from_date['Selling_branch'],"to_date":this.to_date['Selling_branch'] }).subscribe(res =>{
      if(res['app_response_data'] != ''){
        this.piexValues = res['app_response_data']['label'];
        this.pieyValues = res['app_response_data']['value'];
        this.piebarColors = res['app_response_data']['colour_code']
        console.log(this.piexValues,'label');
        // this.showSpinner = false;
      this.pie();
      }else{
        console.log('top selling data is empty');

      }

    });

/*     this.common.topselling({"id_branch":'1',"from_date":this.from_date['Selling_branch'],"to_date":this.to_date['Selling_branch'] }).sub(data=>{
      this.piexValues = data['app_response_data']['label'];
      this.pieyValues = data['app_response_data']['value'];
      this.piebarColors = data['app_response_data']['colour_code']
      this.testpie();
        }); */
      console.log('Delete');
  }

  get_BestSellers(branch:any,date:any){
    this.empData = branch[0].id_branch
    this.to_date['BestSellers_branch'] = date['to']
    this.from_date['BestSellers_branch'] = date['from']
  console.log(this.empData,this.to_date['BestSellers_branch'],this.from_date['BestSellers_branch'],'bm');

    this.common.topsellers({"id_branch":this.empData,"from_date": this.from_date['BestSellers_branch'] ,"to_date":this.to_date['BestSellers_branch'] }).subscribe(data=>{
      if(data['app_response_data'] != ''){
      this.bpiexValues = data['app_response_data']['label'];
      this.bpieyValues = data['app_response_data']['value'];
      this.bpiebarColors = data['app_response_data']['colour_code']
      console.log(this.bpiexValues,'label');

      this.pie1();
      }
      else{
        console.log('seller data is empty');

      }

        });
  }

  get_StockChart(branch:any,date:any){
    // this.empdata1['Selling_branch'] = branch.name;
   this.empData = branch[0].id_branch
   this.from_date['Stock_Chart'] = date['from']
   this.to_date['Stock_Chart'] = date['to']
    this.common.getStockChart({"id_branch":this.empData,"from_date":this.from_date['Stock_Chart'],"to_date":this.to_date['Stock_Chart'] }).subscribe(res =>{
      if(res['app_response_data'] != null){
      this.bbpiexValues = res['app_response_data']['label'];
      this.bbpieyValues = res['app_response_data']['value'];
      this.bbpiebarColors = res['app_response_data']['colour_code']
      console.log(this.bbpiexValues,'label');
    this.pie2();
      }else{
        console.log('stock chart data empty');

      }

    });

  }

  get_estimationstatus(branch:any,date:any){
    this.empData = branch[0].id_branch
    this.from_date['Estimation'] = date['from']
    this.to_date['Estimation'] = date['to']
    this.common.getEstimationStatus({"id_branch":0,"from_date":this.from_date['Estimation'],"to_date":this.to_date['Estimation']}).subscribe(data=>{
      if(data['response_data'] != null){
        this.estiStatus = data['response_data'];
        this.barxValues = data['response_data']['label'];
        this.baryValues = data['response_data']['value'];
        this.barbarColors = data['response_data']['colour_code'];
        this.barchart2()
      }else{
        console.log('estimation data empty');

      }

        });
  }


  get_BranchCompare(branch:any,date:any){
    // this.empdata1['Selling_branch'] = branch.name;
   this.empData = branch[0].id_branch
   this.from_date['BranchWiseCompersion'] = date['from']
   this.to_date['BranchWiseCompersion'] = date['to']
    this.common.getBranchCompare({"id_branch":0,"from_date":this.from_date['BranchWiseCompersion'],"to_date":this.to_date['BranchWiseCompersion'] }).subscribe(res =>{
      this.items = []
      this.items1 = []
      let temBran:any =[]
      let temparn1:any = []
      if(res['responsedata'] != ''){
      this.bar2xValues = res['responsedata']['branch'];
      this.bar2yValues = res['responsedata']['branch_sales']
      this.bar2barColors =  res['responsedata']['colour_code'];
      temBran = res['responsedata']['branch']
      temparn1 = res['responsedata']['branch_sales']

      temparn1.forEach((element:any,i:any)  => {
        console.log(element);
         let temp = {"value":'','id_branch':''};
         temp['value'] =  element.value
         temp['id_branch'] = element.id_branch
         this.items1.push(temp)
      });
      temBran.forEach((element:any,i:any)  => {
      console.log(element);

       let temp = {'name':'','status':false,'id_branch':'','short_code':''};
       temp['name'] =  element.name
       temp['status'] = true
       temp['id_branch'] = element.id_branch
       temp['short_code'] = element.short_code
       this.items.push(temp)
    });
      this.barchart1()
  }else{
    console.log('branch compare data is empty');

  }
    });

  }

  get_Monthlysales(branch:any){
    // this.empData = branch[0].id_branch
    // this.common.month({"id_branch":this.empData['id_branch'],"from_date":this.from,"to_date":this.to}).subscribe(data=>{
    //   if(data['responsedata'] != null){
    //   this.linecolors = data['responsedata']['colour_code'];
    //   this.lineValues = data['responsedata']['branch'];
    //   this.testline(data['responsedata']['month'],data['responsedata']['value'],data['responsedata']['branch']);
    //   }else{
    //     console.log('month slae data empty');

    //   }
    //   });

  }

  get_StoreWiseSales(branch:any,date:any){
    // this.empData = 0
    // this.to_date['StoreWiseSales'] = date['to']
    // this.from_date['StoreWiseSales'] = date['from']
    // this.common.store({"id_branch":this.empData,"from_date":this.from_date['StoreWiseSales'],"to_date":this.to_date['StoreWiseSales']}).subscribe(data=>{
    //   if(data['responsedata'] != null){
    //   this.branch = data['responsedata'];
    //   this.total = 0;
    //   this.branch.forEach((element:any)=>{
    //     this.total = (parseFloat(this.total) + parseFloat(element['branch_sales'])).toFixed(2)
    //   });
    // }
    // else{
    //   console.log('store wise sale empty');

    // }

    //   console.log(parseFloat(this.total).toFixed(1));


    //   });


  }

  async get_SalesGlance(branch:any,date:any){
    this.branch_list3 = branch
    this.empData['Glance_branch'] = branch[0].id_branch
    this.empdata1['Glance_branch'] = branch[0].name;
    this.to_date['Glance_branch'] = date['to']
    this.from_date['Glance_branch'] = date['from']
    this.loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 2000,
      spinner: 'circles'
    });
    await this.loading.present();
    let metal:any =[]
    console.log(this.sale_metal,'metal')
    if(this.sale_metal.length === 0){
      metal = undefined
    }else{
      this.sale_metal.forEach((element:any) => {
         metal.push(element['id_metal'])
      });
    }

    this.formattedDate = this.formatDate(this.from_date['Glance_branch'],this.to_date['Glance_branch']);
    this.common.dashboard({"id_branch": this.empData['Glance_branch'],"from_date": this.from_date['Glance_branch'],"to_date":this.to_date['Glance_branch'],"id_metal":metal}).subscribe(async data=>{
      if(data['responsedata'] != null){
        this.dash = data['responsedata'];
        const formatter:any = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
        const value = 200000
        formatter.format(value) ;
       this.dash['sale_amount'] = formatter.format(data['responsedata']['sale_amount']);
       this.dash['sales_return_amt'] = formatter.format(data['responsedata']['sales_return_amt']);
       this.dash['sale_discount'] = formatter.format(data['responsedata']['sale_discount']);
      }else{
        console.log('sales data empty');
      }
        });
    //  await this.loading.dismiss();

  }

  async get_coverupreport(branch:any){
    this.empData['report'] = branch[0].id_branch
    this.loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 2000,
      spinner: 'circles'
    });
    await this.loading.present();
    this.common.coverupReport({"id_branch":this.empData['report'],'id_metal':this.metal_id}).subscribe(data=>{
      if(data['response_data'] != null){
       this.coverupReport = data['response_data'];
       this.pending_position=data['response_data']['pending']
       console.log(this.coverupReport,'kkkkkkkkkkk');
      }else{
        console.log('report data empty');

      }
        });
  }

  status_value:any
  async get_financialstatus(branch:any,date:any){
    this.branch_list3 = branch
    console.log(this.year,'k')
    this.fin_branch  = branch
    this.empData['financial'] = branch[0].id_branch
    this.empdata1['financial'] = branch[0].name;
    this.from_date['financial'] = date['from']
    this.to_date['financial'] = date['to']
    console.log(this.empData,this.yearly_status,'data');
    this.loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 2000,
      spinner: 'circles'
    });
    await this.loading.present();
    let metal:any =[]
    let metal_id:any
    if(this.fin_metal.length === 0){
      metal = undefined
      metal_id =1
    }else{
      this.fin_metal.forEach((element:any) => {
        metal.push(element['id_metal'])
        metal_id = element['id_metal']
     });
    }
    let fin_data={
      "id_branch":this.empData['financial'],
      "from_date" : this.from_date['financial'],
      "to_date"   : this.to_date['financial'],
      "id_metal"  : metal_id,
      "report_type" :this.yearly_status,
      "fin_year" : this.year
    }

    this.common.getFinacialStatus(fin_data).subscribe(async data=>{
      if(data['response_data'] != null){
      data['response_data']['acchive'] =  parseFloat( data['response_data']['acchive']).toFixed(3)
      this.status_value = data['response_data'];
      this.createChart(this.status_value)
      }
      else{
        console.log('finacial data empty');
      }
        });
    await this.loading.dismiss();

  }


  createChart(data:any){
    console.log(data,'o');
    this.dataSource = {
      "chart": {
          "showValue": "1",
          "numberSuffix": "%",
          "showToolTip": "0",
          "theme": "fusion",
          "licenseKey": "YOUR_LICENSE_KEY_HERE"
      },
      "colorRange": {
          "color": [{
              "minValue": "0",
              "maxValue": "50",
              "code": "#ff0000"
          }, {
              "minValue": "50",
              "maxValue": "75",
              "code": "#ffa600"
          }, {
              "minValue": "75",
              "maxValue": "100",
              "code": "#008000"
          }]
      },
      "dials": {
            "dial": [{
                "value": data['disppercent']
            }]
      }
    }

  }











  get_EmployeeSale(branch:any,date:any){
    // this.empdata1['Selling_branch'] = branch.name;
   this.empData = branch[0].id_branch
   this.from_date['employee_chart'] = date['from']
   this.to_date['employee_chart'] = date['to']
    this.common.getEmployeeSales({"id_branch":this.empData,"from_date":this.from_date['employee_chart'],"to_date":this.to_date['employee_chart'] }).subscribe(res =>{
      if(res['app_response_data'] != null){
      this.emp_bbpiexValues = res['app_response_data']['label'];
      this.emp_bbpieyValues = res['app_response_data']['value'];
      this.emp_bbpiebarColors = res['app_response_data']['colour_code']
      console.log(this.emp_bbpiexValues,'label');
    this.pie3();
      }
      else{
        console.log('employee data empty');

      }
    });

  }

  get_SectionSale(branch:any,date:any){
    // this.empdata1['Selling_branch'] = branch.name;
   this.empData = branch[0].id_branch
   this.from_date['section_chart'] = date['from']
   this.to_date['section_chart'] = date['to']
    this.common.getSectionSales({"id_branch":this.empData,"from_date":this.from_date['section_chart'],"to_date":this.to_date['section_chart'] }).subscribe(res =>{
      if(res['app_response_data'] != null){
      this.sec_bbpiexValues = res['app_response_data']['label'];
      this.sec_bbpieyValues = res['app_response_data']['value'];
      this.sec_bbpiebarColors = res['app_response_data']['colour_code']
      console.log(this.bbpiexValues,'label');
    this.pie4();
      }else {
        console.log('section data empty');

      }

    });

  }

  spackLine() {
    this.options = {
      chart: {
        type: 'line',
        height: 100,
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 2,
          opacity: 0.2,
        },
      },
      series: [
        {
          data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69],
        },
      ],
      stroke: {
        width: 3,
        curve: 'smooth',
      },
      markers: {
        size: 0,
      },
      grid: {
        padding: {
          top: 20,
          left: 110,
          bottom: 10,
        },
      },
      colors: ['#fff'],
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function formatter(_val:any) {
              return ''; // remove title in tooltip
            },
          },
        },
      },
    };
  }

  barChart() {
    this.barOptions = {
      chart: {
        type: 'bar',
        height: 180,
        width: '100%',
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      series: [
        {
          name: 'Clothing',
          data: [42, 52, 16, 55, 59, 51, 45, 32, 26, 33, 44, 51],
        },
        {
          name: 'Foods',
          data: [6, 12, 4, 7, 5, 3, 6, 4, 3, 3, 5, 6],
        },
      ],
      labels: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
      grid: {
        borderColor: '#343E59',
        padding: {
          right: 0,
          left: 0,
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: '#78909c',
          },
        },
      },
      title: {
        text: 'Monthly Sales',
        align: 'left',
        style: {
          fontSize: '16px',
          color: '#78909c',
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        labels: {
          colors: '#78909c',
        },
      },
    };
  }

  areaChart() {
    this.areaOptions = {
      chart: {
        type: 'area',
        height: 180,
        sparkline: {
          enabled: true,
        },
      },
      series: [
        {
          name: 'Sales',
          data: [
            47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93,
            53, 61, 27, 54, 43, 19, 46,
          ],
        },
      ],
      stroke: {
        width: 2,
        colors: ['#ffd3a5'],
      },
      fill: {
        colors: ['#ffd3a5'],
        gradient: {
          gradientToColors: ['#2b2d3e'],
          opacityTo: 0.2,
        },
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
      },
      colors: ['#DCE6EC'],
      title: {
        text: '$424,652',
        offsetX: 30,
        style: {
          fontSize: '24px',
          color: '#78909c',
        },
      },
      subtitle: {
        text: 'Sales',
        offsetX: 30,
        style: {
          fontSize: '14px',
          color: '#78909c',
        },
      },
    };
  }

  radialChart() {
    this.radial = {
      chart: {
        type: 'radialBar',
        height: 180,
      },
      series: [70],
      plotOptions: {
        radialBar: {
          track: {
            background: '#c7c7c7',
            margin: 0,
            strokeWidth: '70%',
          },
          dataLabels: {
            name: {
              color: '#fff',
              offsetY: -10,
              fontSize: '14px',
            },
            value: {
              color: '#fff',
              fontSize: '20px',
              offsetY: 0,
            },
          },
          hollow: {
            size: '65%',
          },
        },
      },
      fill: {
        colors: ['#fd6585'],
      },
      labels: ['Tasks'],
    };
  }

  xvalues: { name: string; percent: number }[] = [];
  pie(){
    console.log(this.piexValues);
    console.log(this.pieyValues);

    this.chartOptions = {
      series:this.pieyValues,
      chart: {
        width: 350,
        type: "pie",
        height: 200,


      },
      labels:this.piexValues,

      responsive: [
        {
          options: {
            chart: {
              width: 200,
              align: 'left',
            },
            legend: {
              position: "right",
              fontSize: '12px',
              fontWeight: 100,
              right: "5px", // Adjust the right margin
              offsetY: 24,  // Adjust the top offset
              offsetX: 0,
            }
          }
        }
      ],
      dataLabels: {
        enabled: true,
        formatter: function (val:any) {
          return val.toFixed(1) + "%"; // Adjust the decimal places as needed
        },
        dropShadow: {
          // ... Drop shadow configuration
        },
      },
      // title: {
      //   text: 'Monthly Sales',
      //   align: 'left',
      //   style: {
      //     fontSize: '12px',
      //     color: '#78909c',
      //     top:10,
      //   },
      // },
      legend: {
        position: "right",
        offsetY: 10,  // Adjust the top offset
        offsetX: 5,   // Adjust the right offset
        fontSize: '12px',
        fontWeight: 100,
        width:130,
        colors: '#78909c',
        labels: {
          colors: '#78909c',
        },
      },
      colors:this.piebarColors,


    };



let percent:any =[]
this.xvalues =[]
    this.piexValues.forEach((label:any, index:any) => {
      var percentage = ((this.pieyValues[index] / this.pieyValues.reduce((a:any, b:any) => a + b, 0)) * 100).toFixed(2) + "%";
      console.log(percentage);
      percent.push(percentage)
      var legendItem = document.createElement("div");
      legendItem.innerHTML = label + ": " + percentage;

    });
    for (var i = 0; i < this.piexValues.length; i++) {
      // xvalues['name'] = this.piexValues[i];
      // xvalues['percent'] = percent[i];
      this.xvalues.push({ name: this.piexValues[i], percent: percent[i] });



    }

    console.log(this.xvalues);


  }

  yvalues: { name: string; percent: number }[] = [];
  pie1(){
    console.log(this.bpiexValues);
    console.log(this.bpieyValues);

    this.bestsellers = {
      labels: this.bpiexValues,
      series: this.bpieyValues,
      chart: {
        width: 350,
        type: "pie", // Set the width of the chart
        height: 200,
      },
      responsive: [
        {
          options: {
            chart: {
              width: 200,
              align: 'left',
            },
            legend: {
              position: "right",
              fontSize: '12px',
              fontWeight: 100,
              right: "5px", // Adjust the right margin
              offsetY: 24,  // Adjust the top offset
              offsetX: 0,

            }
          }
        }
      ],
      legend: {
        position: "right",
        offsetY: 10,  // Adjust the top offset
        offsetX: 10,   // Adjust the right offset
        fontSize: '12px',
        fontWeight: 100,
        width:130,
        colors: '#78909c',
        labels: {
          colors: '#78909c',
        },
      },






      colors:this.bpiebarColors,
      // ... other configurations for the second chart
    };

    let percent:any =[]
    this.yvalues =[]
        this.bpiexValues.forEach((label:any, index:any) => {
          var percentage = ((this.bpieyValues[index] / this.bpieyValues.reduce((a:any, b:any) => a + b, 0)) * 100).toFixed(2) + "%";
          console.log(percentage);
          percent.push(percentage)
          var legendItem = document.createElement("div");
          legendItem.innerHTML = label + ": " + percentage;

        });
        for (var i = 0; i < this.bpiexValues.length; i++) {
          // xvalues['name'] = this.piexValues[i];
          // xvalues['percent'] = percent[i];
          this.yvalues.push({ name: this.bpiexValues[i], percent: percent[i] });



        }

        console.log(this.yvalues);


  }
  zvalues: { name: string; percent: number }[] = [];
  pie2(){
    console.log(this.bbpiexValues);
    console.log(this.bbpieyValues);

    this.stockchart = {
      series:this.bbpieyValues,
      chart: {
        width: 350,
        type: "pie",
        height: 200,


      },
      labels:this.bbpiexValues,

      responsive: [
        {
          options: {
            chart: {
              width: 200,
              align: 'left',
            },
            legend: {
              position: "right",
              fontSize: '12px',
              fontWeight: 100,
              right: "5px", // Adjust the right margin
              offsetY: 24,  // Adjust the top offset
              offsetX: 0,
            }
          }
        }
      ],
      dataLabels: {
        enabled: true,
        formatter: function (val:any) {
          return val.toFixed(1) + "%"; // Adjust the decimal places as needed
        },
        dropShadow: {
          // ... Drop shadow configuration
        },
      },
      // title: {
      //   text: 'Monthly Sales',
      //   align: 'left',
      //   style: {
      //     fontSize: '12px',
      //     color: '#78909c',
      //     top:10,
      //   },
      // },
      legend: {
        position: "right",
        offsetY: 10,  // Adjust the top offset
        offsetX: 5,   // Adjust the right offset
        fontSize: '12px',
        fontWeight: 100,
        width:130,
        colors: '#78909c',
        labels: {
          colors: '#78909c',
        },
      },
      colors:this.bbpiebarColors,


    };



let percent:any =[]
this.zvalues =[]
    this.bbpiexValues.forEach((label:any, index:any) => {
      var percentage = ((this.bbpieyValues[index] / this.bbpieyValues.reduce((a:any, b:any) => a + b, 0)) * 100).toFixed(2) + "%";
      console.log(percentage);
      percent.push(percentage)
      var legendItem = document.createElement("div");
      legendItem.innerHTML = label + ": " + percentage;

    });
    for (var i = 0; i < this.bbpiexValues.length; i++) {
      // xvalues['name'] = this.piexValues[i];
      // xvalues['percent'] = percent[i];
      this.zvalues.push({ name: this.bbpiexValues[i], percent: percent[i] });



    }

    console.log(this.zvalues);


  }

  emp_values: { name: string; percent: number }[] = [];
  pie3(){
    console.log(this.emp_bbpiexValues);
    console.log(this.emp_bbpieyValues);
    this.employeechart = {
      series:this.emp_bbpieyValues,
      chart: {
        width: 350,
        type: "pie",
        height: 200,


      },
      labels:this.emp_bbpiexValues,

      responsive: [
        {
          options: {
            chart: {
              width: 200,
              align: 'left',
            },
            legend: {
              position: "right",
              fontSize: '12px',
              fontWeight: 100,
              right: "5px", // Adjust the right margin
              offsetY: 24,  // Adjust the top offset
              offsetX: 0,
            }
          }
        }
      ],
      dataLabels: {
        enabled: true,
        formatter: function (val:any) {
          return val.toFixed(1) + "%"; // Adjust the decimal places as needed
        },
        dropShadow: {
          // ... Drop shadow configuration
        },
      },
      // title: {
      //   text: 'Monthly Sales',
      //   align: 'left',
      //   style: {
      //     fontSize: '12px',
      //     color: '#78909c',
      //     top:10,
      //   },
      // },
      legend: {
        position: "right",
        offsetY: 10,  // Adjust the top offset
        offsetX: 5,   // Adjust the right offset
        fontSize: '12px',
        fontWeight: 100,
        width:130,
        colors: '#78909c',
        labels: {
          colors: '#78909c',
        },
      },
      colors:this.emp_bbpiebarColors,


    };



let percent:any =[]
this.emp_values =[]
    this.emp_bbpiexValues.forEach((label:any, index:any) => {
      var percentage = ((this.emp_bbpieyValues[index] / this.emp_bbpieyValues.reduce((a:any, b:any) => a + b, 0)) * 100).toFixed(2) + "%";
      console.log(percentage);
      percent.push(percentage)
      var legendItem = document.createElement("div");
      legendItem.innerHTML = label + ": " + percentage;

    });
    for (var i = 0; i < this.emp_bbpiexValues.length; i++) {
      // xvalues['name'] = this.piexValues[i];
      // xvalues['percent'] = percent[i];
      this.emp_values.push({ name: this.emp_bbpiexValues[i], percent: percent[i] });



    }

    console.log(this.emp_values);


  }

  sec_values: { name: string; percent: number }[] = [];
  pie4(){
    console.log(this.sec_bbpiexValues);
    console.log(this.sec_bbpieyValues);
    this.sectionchart = {
      series:this.sec_bbpieyValues,
      chart: {
        width: 350,
        type: "pie",
        height: 200,


      },
      labels:this.sec_bbpiexValues,

      responsive: [
        {
          options: {
            chart: {
              width: 200,
              align: 'left',
            },
            legend: {
              position: "right",
              fontSize: '12px',
              fontWeight: 100,
              right: "5px", // Adjust the right margin
              offsetY: 24,  // Adjust the top offset
              offsetX: 0,
            }
          }
        }
      ],
      dataLabels: {
        enabled: true,
        formatter: function (val:any) {
          return val.toFixed(1) + "%"; // Adjust the decimal places as needed
        },
        dropShadow: {
          // ... Drop shadow configuration
        },
      },
      // title: {
      //   text: 'Monthly Sales',
      //   align: 'left',
      //   style: {
      //     fontSize: '12px',
      //     color: '#78909c',
      //     top:10,
      //   },
      // },
      legend: {
        position: "right",
        offsetY: 10,  // Adjust the top offset
        offsetX: 5,   // Adjust the right offset
        fontSize: '12px',
        fontWeight: 100,
        width:130,
        colors: '#78909c',
        labels: {
          colors: '#78909c',
        },
      },
      colors:this.sec_bbpiebarColors,


    };



let percent:any =[]
this.sec_values =[]
    this.sec_bbpiexValues.forEach((label:any, index:any) => {
      var percentage = ((this.sec_bbpieyValues[index] / this.sec_bbpieyValues.reduce((a:any, b:any) => a + b, 0)) * 100).toFixed(2) + "%";
      console.log(percentage);
      percent.push(percentage)
      var legendItem = document.createElement("div");
      legendItem.innerHTML = label + ": " + percentage;

    });
    for (var i = 0; i < this.sec_bbpiexValues.length; i++) {
      // xvalues['name'] = this.piexValues[i];
      // xvalues['percent'] = percent[i];
      this.sec_values.push({ name: this.sec_bbpiexValues[i], percent: percent[i] });



    }

    console.log(this.sec_values);


  }

barchart1(){
  let temp:any = []
  let temp1:any = []
  console.log(this.bar2xValues);
  if( this.bar2xValues != undefined && this.bar2yValues != undefined){
    this.bar2xValues.forEach((element:any) => {
      let data = element['short_code']
      temp.push(data)
    });
    this.bar2yValues.forEach((element:any) => {
      let data = element['value']
      temp1.push(data)
    });
  }

console.log(1213213);
console.log(temp1);
console.log(temp);
let max_total1:any
let result1:any=[]

  this.chartOptions1 = {
    series: [
      {
        name: "distibuted",
        data: temp1
      }
    ],
    chart: {
      height: 300,
      type: "bar",
      toolbar: {
        show: false
      }
    },
    colors:this.bar2barColors,

    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
        dataLabels: {
          position: "top" // top, center, bottom
        }
      }
    },
    dataLabels: {
      enabled: true,
        formatter: function(val:any) {
          const percentage = (val * 100)/max_total1;
          return (percentage).toFixed(2) + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
    },
    legend: {
      show: false
    },
    grid: {
      show: false
    },
    xaxis: {
      categories:temp,
      labels: {
        style: {
          fontSize: "12px"
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function (value:any) {
          // Format the y-axis labels in 1L 5K format
          result1.push(value)
          max_total1 = Math.max(...result1);
          if (value >= 1000000) {
            return (value / 1000000).toFixed(0) + 'L';
          } else if (value >= 1000) {
            return (value / 1000).toFixed(0) + 'K';
          } else {
            return value;
          }
        }

      }

  },
}

}

barchart2(){
  let temp:any = []
  let temp1:any = []
  console.log(this.barxValues);
  if( this.barxValues != undefined && this.baryValues != undefined){
    this.barxValues.forEach((element:any) => {
      let data = element['name']
      temp.push(data)
    });
    this.baryValues.forEach((element:any) => {
      let data = element['value']
      temp1.push(data)
    });
  }

console.log(1213213);
console.log(temp1);
console.log(temp);
let max_total1:any
let result1:any=[]

  this.Estimation = {
    series: [
      {
        name: "distibuted",
        data: temp1
      }
    ],
    chart: {
      height: 300,
      type: "bar",
      toolbar: {
        show: false
      }
    },
    colors:this.bar2barColors,

    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
        dataLabels: {
          position: "top" // top, center, bottom
        }
      }
    },
    dataLabels: {
      enabled: true,
        formatter: function(val:any) {
          const percentage = (val * 100)/max_total1;
          return (percentage).toFixed(2) + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
    },
    legend: {
      show: false
    },
    grid: {
      show: false
    },
    xaxis: {
      categories:temp,
      labels: {
        style: {
          fontSize: "12px"
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function (value:any) {
          // Format the y-axis labels in 1L 5K format
          result1.push(value)
          max_total1 = Math.max(...result1);
          if (value >= 1000000) {
            return (value / 1000000).toFixed(0) + 'L';
          } else if (value >= 1000) {
            return (value / 1000).toFixed(0) + 'K';
          } else {
            return value;
          }
        }

      }

  },
}

}

gett(e:any,idx:any){
  console.log('eee: ',e);
  console.log('Orignal' ,this.items1);
  console.log('orignal',this.items);
  let i = this.bar2xValues.findIndex((data:any)=>data['name'] == e['name']);
  let j =  this.bar2yValues.findIndex((data:any) => data['id_branch'] == e['id_branch'])
  console.log(j,'ppppp');

console.log(i)
console.log(e['name'])
  if(i == -1 && j == -1){
    this.bar2xValues.push(e);
    this.items1.forEach((element)  => {
      console.log(element);
      if(e.id_branch == element.id_branch){
        this.bar2yValues.push(element)
      }
    });
   // this.bar2yValues.push(e)
    console.log('1',this.bar2xValues);
    console.log('2',this.bar2yValues);
    this.barchart1();
  }
else{
  this.bar2xValues.splice(i,1);
  this.bar2yValues.splice(j,1)
  console.log( this.bar2xValues,'pppppppppppp');
  console.log(this.bar2yValues,'ooooooooooo');

  this.barchart1();
}

  }



testline(month:any,value:any,branch:any) {
  const xValues = month;
  this.lineValues = branch;
let data:any = []
value.forEach((element:any,i:any) => {
data.push({
data:element,
borderColor: this.linecolors[i],
fill: false
})
});
console.log(data,'jjjjjjjjj');
console.log(xValues,'kkkkkk');


let yvalue =data[0].data

    this.linechart = {
      series: [
        {
          name: "Values",
          data: yvalue
        }
      ],
      chart: {
        type: "area",
        stacked: false,
        height: 300,
        zoom: {
          type: "x",
          enabled: false,
          autoScaleYaxis: false
        },
        toolbar: {
          autoSelected: "zoom",
          show: false
        }
      },
      colors:this.bar2barColors,
      title:{
        text: "",
        align: "left"
      },
      dataLabels:{
        enabled: false
      },
      markers:{
        size: 2
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: xValues,
        labels: {
          rotate: -45, // Optional: Rotate labels for better visibility
        }
      },
      yaxis: {
        labels: {
          formatter: function (value:any) {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(0) + 'L';
            } else if (value >= 1000) {
              return (value / 1000).toFixed(0) + 'K';
            } else {
              return value;
            }
          }
        },

        title: {
          text: "Price"
        }

    },
    tooltip:{
      shared: false,
      y: {
        formatter: function(val:any) {
          return (val).toFixed(2);
        }
      }
    }

  }

  }

radial_chart(value:any){
  let data:any =[{offset:'',
    color: ''}]
  console.log(value,'a');
  if(value<=35){
    data[0]['offset']=0
    data[0]['color']="#FF0000"
  }else if(value >= 35 && value<= 70){
    data[0]['offset']=0
    data[0]['color']="#ffa500"
  }else if(value >= 70){
    data[0]['offset']=0
    data[0]['color']="#008000"
  }

  this.Radialchart = {
    series: [value],
    chart: {
      type: "radialBar",
      offsetY: -20
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            opacity: 0.31,
            blur: 2
          }
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            offsetY: -2,
            fontSize: "22px"
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 20, 40, 60, 80, 100],
        colorStops: data
      }
    },
    labels: ["Average Results"]
  };
}




openpage(pageName:any){
  console.log(pageName,'page');
 if(pageName == 'Home'){
    this.router.navigate(['/home'])
  }
  else if(pageName == 'sale'){
   this.router.navigate(['/saleschart-view'])
  }
  else if(pageName == 'stock'){
    this.router.navigate(['/stockchart-view'])
   }
  else if(pageName == 'Approval'){
    let data = undefined
    this.common.setData(data);
   this.router.navigate(['/bill-approve'])
}

}

message:any
fin_branch:any
sale_metal:any=[]
fin_metal:any=[]
async openModal(temp:any,type:any) {
  let branch1:any={'id_branch':'','temp':'','metal':[]}
  if(temp == 1){
    branch1['id_branch'] = this.empData['Glance_branch']
    branch1['temp'] = temp
    branch1['metal']=this.sale_metal
  }else if(temp == 23){
    branch1['id_branch'] = this.empData['financial']
    branch1['temp'] = temp
    branch1['metal'] = this.fin_metal

  }
   this.loading = await this.loadingController.create({
    message: 'Loading...',
    // duration: 2000,
    spinner: 'circles'
  });
  const modal = await this.modalCtrl.create({
    component: BranchShowComponent, componentProps: {
      data: branch1 // Pass the data object
    }

  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();
  await this.loading.dismiss();
  // this.get_branchfilter(data)
  // let branch=[]
  if (role === 'confirm') {
    console.log(data,'id');

  }
  if(type == 'fin' && data != null){
    // branch.push(data['branch'])
    this.fin_metal = data['metal']
    console.log(this.fin_metal);
    this.get_financialstatus(data['branch'],this.date1)
  }else if(type == 'top' && data != null){
    // branch.push(data['branch'])
    this.sale_metal = data['metal']
    console.log(this.sale_metal);
    // await this.storage.set('filter', JSON.stringify(data))
    this.get_SalesGlance(data['branch'],this.date1)

  }


}



openModal1(temp:any) {
  let data = {
    type: temp
  }
  this.common.setData(data);
  this.router.navigate(['/reporthistory'])

}

onChange(type:any){
  console.log(type,'d');

}
selectedOption:any

choose(){
  console.log(this.selectedOption,'k');

}

checkColorScheme() {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (isDark !== this.isDarkMode) {
    this.isDarkMode = isDark;
    // Perform actions or update UI based on the new color scheme
    console.log('Color scheme changed to', this.isDarkMode ? 'dark' : 'light');
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    this.isDarkMode = e.matches;
    this.get_color()
  });



}


  async get_color(){
  console.log(this.isDarkMode,'mode');
  if(this.isDarkMode == true){
    this.color_mode = 'light'
  }else if(this.isDarkMode == false){
    this.color_mode = 'dark'
  }
  await this.storage.set('color',this.color_mode );
}

async ionViewWillEnter() {

    // Listen for changes in the color scheme
    this.checkColorScheme();
    this.get_color()
   // Check every minute



  this.loading = await this.loadingController.create({
    message: 'Loading...',
    duration: 2000,
    spinner: 'circles'
  });
  this.empData_log = JSON.parse(await this.storage.get('empDetail'));
  console.log(this.empData_log,'emp');
  this.branch_list['name']= this.empData_log['branch_name']
  this.branch_list['id_branch']= this.empData_log['branch_id']


    // this.get_branch()
    // let empdata = JSON.parse(localStorage.getItem('empDetail'));
    // console.log(this.empData['id_branch']);
    this.common.menu_option = true
    this.app.get_branch();




    // branch_list['name']= empdata['branch_name']
    // branch_list['id_branch'] = empdata['id_branch']


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
const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear().toString().substr(-2)}`;
  // var ddd = date.getDate();
	  var mmm = date.getMonth() == 0 ? 12 : date.getMonth();
	  var yy =  date.getMonth() == 0 ? date.getFullYear() - 1 : date.getFullYear();
	  // var today = date.toISOString().substring(0, 10);
	  // this.from = yy+"-"+mmm+"-"+ddd;
    var day = date.getDate().toString().padStart(2, '0'); */


	  this.from = yy+"-"+month+"-"+day;
    this.formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear().toString().substr(-2)}` +'to' + `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear().toString().substr(-2)}` ;
    console.log( this.from);
    this.today = false







    this.date1['from'] = this.from
    this.date1['to'] = this.to
    // this.get_metal()
    this.common.getbranch().subscribe(async res =>{
      console.log(res,'branch');
      this.branch_list1 = res;
      this.common_branch = res;
      console.log(this.branch_list1,'111111');
      let branch =[]
      branch.push(this.branch_list)
      this.branch_list3.push(this.branch_list)
      console.log(branch,'111111');
      if(this.branch_list1 != '' && this.branch_list1 != undefined){
        this.get_SalesGlance(branch,this.date1)
        // this.get_SalesPrdoucts(branch_list,this.date1)
        // this.get_BestSellers(branch_list,this.date1)
        // this.get_StockChart(branch_list,this.date1)
        // this.get_BranchCompare(branch_list,this.date1)
        // this.get_estimationstatus(branch_list,this.date1)
        // this.get_Monthlysales(branch_list)
        // this.get_StoreWiseSales(branch_list,this.date1)
        this.get_coverupreport(branch)
        this.get_financialstatus(branch,this.date1)
        // this.get_EmployeeSale(branch_list,this.date1)
        // this.get_SectionSale(branch_list,this.date1)

      }

      });

    console.log(this.piexValues,'label');
    // this.spackLine();
    // this.barChart();
    // this.areaChart();
    // this.radialChart();
    // this.barchart1();


      // const index = e.target.swiper.activeIndex
      // this.selectedSegment = this.segmentList[index]
      console.log(this.selectedSegment,'kkkkkkkk');

      this.common.fin1().subscribe(res => {
        this.fin = res['responsedata'];
        console.log(res,'data');
        this.year = this.fin[0]['fin_id']
        // this.tagData['fin_year'] = this.fin[0]
        // this.tagData['fin_year'] = this.fin.filter(data=>data['fin_status'] == 1)[0]['fin_year_code'];
     });

}
selectedChip:any
selectedChip1:any
get_date(data:any,type:any){
if(data == 'today' ){

  var date = new Date();
  var mmm = date.getMonth() + 1;
  var yy = date.getFullYear();
  var day = date.getDate().toString().padStart(2, '0');
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  this.to = yy+"-"+month+"-"+day;
  console.log(this.to);
  this.from = yy+"-"+month+"-"+day;
  this.formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear().toString().substr(-2)}` +'to' + `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear().toString().substr(-2)}` ;
  console.log( this.from);
  this.date1['from'] = this.from
  this.date1['to'] = this.to
  if(type == 1){
    this.get_SalesGlance(this.branch_list3,this.date1)
    this.day ='today'
  }else if(type == 2){
    this.get_financialstatus(this.branch_list3,this.date1)
    this.day1 ='today'
  }

}else if(data == 'yest'){
  var date = new Date();
  this.selectedChip = data;
  var ddd = date.getDate();
  var mmm = date.getMonth() + 1;
  var yy =  date.getFullYear() ;
  // var today = date.toISOString().substring(0, 10);
  // this.to = `${yy}-${(mmm < 10 ? '0' : '') + mmm}-${(ddd < 10 ? '0' : '') + ddd}`
  // this.to = yy+"-"+mmm+"-"+ddd;

  date.setDate(date.getDate() - 1);
  var ddd = date.getDate();
  var mmm = date.getMonth() + 1;
  var yy =  date.getFullYear() ;
  // var today = date.toISOString().substring(0, 10);
  // this only fetched 1 month
  this.from = `${yy}-${(mmm < 10 ? '0' : '') + mmm}-${(ddd < 10 ? '0' : '') + ddd}`;
  this.to = this.from
  // this.from = yy+"-"+mmm+"-"+ddd;
  this.date1['from'] = this.from
  this.date1['to'] = this.to
  console.log(this.date1,'yes date');
  if(type == 1){
    this.get_SalesGlance(this.branch_list3,this.date1)
    this.day ='yesterday'
  }else if(type == 2){
    this.day1 ='yesterday'
    this.get_financialstatus(this.branch_list3,this.date1)
  }

}
else if(data == 'month'){

  var date = new Date();
  let today = new Date();
  this.selectedChip = data;

  // Calculate the first day of the last month
  let firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  var ddd = 1
  var mmm = firstDayOfLastMonth.getMonth() + 1;
  var yy =  firstDayOfLastMonth.getFullYear() ;
  this.from = `${yy}-${(mmm < 10 ? '0' : '') + mmm}-${(ddd < 10 ? '0' : '') + ddd}`;

  let lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  var ddd = lastDayOfLastMonth.getDate()
  var mmm = lastDayOfLastMonth.getMonth() + 1;
  var yy =  lastDayOfLastMonth.getFullYear() ;
  this.to = `${yy}-${(mmm < 10 ? '0' : '') + mmm}-${(ddd < 10 ? '0' : '') + ddd}`

  this.date1['from'] = this.from
  this.date1['to'] = this.to
  console.log(this.date1,'month date');
  if(type == 1){
    this.get_SalesGlance(this.branch_list3,this.date1)
    this.day ='Last Month'
  }else if(type == 2){
    this.get_financialstatus(this.branch_list3,this.date1)
    this.day1 ='Last Month'
  }
}
else if(data == 'this_month'){
  const currentDate = new Date();

// Get the current year and month
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth(); // Zero-indexed

// Get the first day of the current month
const firstDayOfMonth = new Date(currentYear, currentMonth, 1);

// Get the last day of the current month
const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

// Format the dates as desired (e.g., "yyyy-mm-dd")
const formattedFirstDayOfMonth = `${firstDayOfMonth.getFullYear()}-${(firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0')}-${firstDayOfMonth.getDate().toString().padStart(2, '0')}`;
const formattedLastDayOfMonth = `${lastDayOfMonth.getFullYear()}-${(lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0')}-${lastDayOfMonth.getDate().toString().padStart(2, '0')}`;

console.log("Start date of the current month:", formattedFirstDayOfMonth);
console.log("End date of the current month:", formattedLastDayOfMonth);
this.date1['from'] = formattedFirstDayOfMonth
this.date1['to'] = formattedLastDayOfMonth
  console.log(this.date1,'month date');
  if(type == 1){
    this.get_SalesGlance(this.branch_list3,this.date1)
    this.day ='this Month'
  }else if(type == 2){
    this.get_financialstatus(this.branch_list3,this.date1)
    this.day1 ='this Month'
  }
}
}

async closePopover() {
  console.log('kl');

  await this.popoverController.dismiss();
}





tog(data:any){
  if(data == 2){
this.toggle = true
  }else{
this.toggle = false

  }
}


get_metal(){
  this.common.metal().subscribe(async res =>{
    this.fin_metal1 = res['responsedata']
    this.metal_id = this.fin_metal1[0]['id_metal']
    // this.fin_metal1.forEach((element:any,i:any)  => {
    //   element['status'] = false
    // });
    console.log(this.fin_metal,'metal data');
  });
}

  async Add_CoverUp(){
    this.toggle = false
  // this.loading = await this.loadingController.create({
  //   message: 'Loading...',
  //   duration: 2000,
  //   spinner: 'circles'
  // });
  // await this.loading.present();
  let post_data={
    "weight": this.pending_position,
    "metal":this.metal_id ,
    "created_by": this.empData_log['uid']
  }
    this.common.Add_CoverUp(post_data).subscribe(async data=>{
      if(data['status']){
        this.get_coverupreport(this.common_branch)
        this.common.presentToast(data['message']);
      }else{
        console.log('report data empty');

      }
    // await this.loading.dismiss();

        });
}


get_pending(){

  console.log(this.pending_position,'kkk');

  if (this.pending_position < 0) {
    this.pending_position = 0; // Reset to 0 if a negative value is entered
  }

}

}
