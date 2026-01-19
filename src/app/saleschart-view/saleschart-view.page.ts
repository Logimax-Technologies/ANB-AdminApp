import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis } from 'ng-apexcharts';
import { Common1Service } from 'src/service/common1.service';
import { AppComponent } from '../app.component';
import { LoadingController, ModalController } from '@ionic/angular';
import Swiper from 'swiper';
import { BranchShowComponent } from '../model/branch-show/branch-show.component';
import { Storage } from '@ionic/storage-angular';
import { PopoverController } from '@ionic/angular';
import Chart from 'chart.js/auto';




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
  selector: 'app-saleschart-view',
  templateUrl: './saleschart-view.page.html',
  styleUrls: ['./saleschart-view.page.scss'],
})
export class SaleschartViewPage implements OnInit {

  @ViewChild('percentageChart')
  percentageChart!: ElementRef;


  branchData = [
    { branch_name: 'Branch 1', branch_sales: 500, branch_sales_percentage: 25 },
    { branch_name: 'Branch 2', branch_sales: 700, branch_sales_percentage: 35 },
    { branch_name: 'Branch 3', branch_sales: 800, branch_sales_percentage: 40 }
  ];
  types:any=[{
    'approval_type':'1',
    'approval_name':'Month sale'
  },
  {
    'approval_type':'2',
    'approval_name':'Store'
  },
  {
    'approval_type':'3',
    'approval_name':'Top Sale'
  },
  {
    'approval_type':'4',
    'approval_name':'Best Seller'
  },
  {
    'approval_type':'5',
    'approval_name':'Section Sale'
  },
  {
    'approval_type':'6',
    'approval_name':'Employee Sale'
  },
  {
    'approval_type':'7',
    'approval_name':'Customer Wise Sale'
  }]



  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public dataLabels!: ApexDataLabels;
  public markers!: ApexMarkers;
  public title!: ApexTitleSubtitle;
  public fill!: ApexFill;
  public yaxis!: ApexYAxis;
  public xaxis!: ApexXAxis;
  public tooltip!: ApexTooltip;


  public linechart!: Partial<ChartOptions>
  public chartOptions!: Partial<ChartOptions>
  public bestsellers!: Partial<ChartOptions>
  public sectionchart!: Partial<ChartOptions>
  public employeechart!: Partial<ChartOptions>
  public customerchart!: Partial<ChartOptions>
  public linechart1!: Partial<ChartOptions>







  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;


  // empData:any
  esti_type:any = '1'
  linecolors:any
  lineValues:any =[]
  from:any;
	to:any;
  date1={'from':'','to':''}
  bar2barColors:any;
  loading:any
  branch_list1:any=[];
  common_branch:any
  month:any
  sale:any
	branch:any = [];
  total:any
  piexValues:any=[]
  pieyValues:any=[]
  piebarColors:any=[];
  selectedSegment:any
  bpiexValues:any=[]
  bpieyValues:any=[]
  bpiebarColors:any=[]
  sec_bbpiexValues:any=[]
  sec_bbpieyValues:any=[]
  sec_bbpiebarColors:any=[]
  emp_bbpiexValues:any=[]
  emp_bbpieyValues:any=[]
  emp_bbpiebarColors=[]
  cus_bbpiexValues:any=[]
  cus_bbpieyValues:any=[]
  cus_bbpiebarColors=[]
  fin = [];

  branch_list3={'name':'','id_branch':''}
  branch_list:any=[]
  day={'Glance_branch':'today','Selling_branch':'today','SalesComparison_branch':'today','BestSellers_branch':'today','Stock_Chart':'today','Month_Sales':'today','Estimation_branch':'today','section':'today','employee_branch':'today','customer_branch':'today','StoreWiseSales':'today'}
  metal={'Glance_branch':[],'Selling_branch':[],'SalesComparison_branch':[],'BestSellers_branch':[],'Stock_Chart':[],'Month_Sales':[],'Estimation_branch':[],'section':[],'employee_branch':[],'customer_branch':[],'StoreWiseSales':[]}
  empdata1={'Glance_branch':'','Selling_branch':'','SalesComparison_branch':'','BestSellers_branch':'','Stock_Chart':'','Month_Sales':'','Estimation_branch':'','section':'','employee_branch':'','customer_branch':'','StoreWiseSales':''}
  from_date:any = {'Glance_branch':'',"Selling_branch":"","SalesComparison_branch":"","BestSellers_branch":"","Stock_Chart":"","Month_Sales":'','StoreWiseSales':'','BranchWiseCompersion':'','Estimation':'','financial':'','employee_chart':'','section_chart':'','cus_chart':''};
  to_date:any = {'Glance_branch':'',"Selling_branch":"","SalesComparison_branch":"","BestSellers_branch":"","Stock_Chart":"","Month_Sales":'','StoreWiseSales':'','BranchWiseCompersion':'','Estimation':'','financial':'','employee_chart':'','section_chart':'','cus_chart':''};
  empData={'Glance_branch':'','Selling_branch':'','SalesComparison_branch':'','BestSellers_branch':'','Stock_Chart':'','Month_Sales':'','Estimation_branch':'','financial':'','report':'','StoreWiseSales':'','employee_branch':'','customer_branch':'','section':''}


  year:any
  today = false
  formattedDate:any
  constructor(private popoverController: PopoverController,private storage: Storage,public router: Router,public common:Common1Service,public app:AppComponent,private loadingController: LoadingController,private modalCtrl: ModalController) {


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

  // var ddd = date.getDate();
	  var mmm = date.getMonth() == 0 ? 12 : date.getMonth();
	  var yy =  date.getMonth() == 0 ? date.getFullYear() - 1 : date.getFullYear();
	  // var today = date.toISOString().substring(0, 10);
	  // this.from = yy+"-"+mmm+"-"+ddd;
    var day = date.getDate().toString().padStart(2, '0'); */


	  this.from = yy+"-"+month+"-"+day;
    console.log( this.from);








    this.date1['from'] = this.from
    this.date1['to'] = this.to
    this.common.getbranch().subscribe(async res =>{
    //   this.loading = await this.loadingController.create({
    //    message: 'Loading...',
    //    // duration: 3000,
    //    spinner: 'circles'
    //  });
    //  await this.loading.present();
     console.log(res,'branch');
     this.branch_list1 = res;
     this.common_branch = res;
     console.log(this.branch_list1,'111111');
     let branch =[]
     this.branch_list.push(this.branch_list3)
    //  this.branch_list =  this.branch_list1
     this.get_Monthlysales(this.branch_list)
    //  await this.loading.dismiss();
     });

     this.common.fin1().subscribe(res => {
      this.fin = res['responsedata'];
      console.log(res,'data');
      this.year = this.fin[0]['fin_year_code']
      // this.tagData['fin_year'] = this.fin[0]
      // this.tagData['fin_year'] = this.fin.filter(data=>data['fin_status'] == 1)[0]['fin_year_code'];
   });
  }





  change_option(){

	  var date = new Date();
	  // var ddd = date.getDate();
	  var mmm = date.getMonth() + 1;
	  var yy = date.getFullYear();
    var day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
	  this.to = yy+"-"+month+"-"+day;
    console.log(this.to);
	  this.from = yy+"-"+month+"-"+day;
    console.log( this.from);
    console.log(this.esti_type);
    this.date1['from'] = this.from
    this.date1['to'] = this.to
    this.today = false
    if(this.esti_type == 1){
    this.get_Monthlysales(this.branch_list)
  }else if(this.esti_type == 2){
    this.day['StoreWiseSales'] ='today'
    this.get_StoreWiseSales(this.branch_list,this.date1)
  }else if(this.esti_type == 3){
    this.day['Selling_branch'] ='today'
    this.get_SalesPrdoucts(this.branch_list,this.date1)
  }
  else if(this.esti_type == 4){
    this.day['BestSellers_branch'] ='today'
    this.get_BestSellers(this.branch_list,this.date1)
  }
  else if(this.esti_type == 5){
    this.day['section'] ='today'
    this.get_SectionSale(this.branch_list,this.date1)
  }
  else if(this.esti_type == 6){
    this.day['employee_branch'] ='today'
    this.get_EmployeeSale(this.branch_list,this.date1)
  }
  else if(this.esti_type == 7){
    this.day['customer_branch'] ='today'
    this.get_CustomerSale(this.branch_list,this.date1)
  }
}

  openpage(){
    this.router.navigate(['/home'])

  }

  month_branch:any=[]
  async get_Monthlysales(branch:any){
    console.log(branch,'data')
    this.empdata1['Month_Sales'] = branch[0].name;
    this.month = true
    this.empData['Month_Sales'] = branch[0].id_branch
    this.loading = await this.loadingController.create({
      message: 'Loading...',
      // duration: 3000,
      spinner: 'circles'
    });
    await this.loading.present();
    // let branch1:any =[]
    this.month_branch =[]
    branch.forEach((element:any) => {
      this.month_branch.push(element['id_branch'])
   });
    let metal:any =[]
    console.log(this.metal['Month_Sales'],'metal')
    if(this.metal['Month_Sales'].length === 0){
      metal = undefined
    }else{
      this.metal['Month_Sales'].forEach((element:any) => {
         metal.push(element['id_metal'])
      });
    }
    console.log(this.month_branch,'data')
    this.common.month({"id_branch":this.month_branch,"from_date":this.from,"to_date":this.to,"id_metal":metal,"fin_year" :this.year}).subscribe(async data=>{
      if(data['responsedata'] != null){
      this.linecolors = data['responsedata']['colour_code'];
      this.lineValues = data['responsedata']['branch'];
      }else{
        console.log('month slae data empty');
        this.lineValues = []
      }
      // this.testline(data['responsedata']['month'],data['responsedata']['value'],data['responsedata']['branch']);
      this.char(data['responsedata']['month'],data['responsedata']['colour_code'],data['responsedata']['branch'])
      await this.loading.dismiss();

      });


  }


top_sale:any
  async get_SalesPrdoucts(branch:any,date:any){
    this.branch_list = branch
    this.empdata1['Selling_branch'] = branch[0].name;
   this.empData['Selling_branch'] = branch[0].id_branch
    this.to_date['Selling_branch'] = date['to']
    this.from_date['Selling_branch'] = date['from']
    this.formattedDate = this.formatDate(this.from_date['Selling_branch'],this.to_date['Selling_branch']);

    this.loading = await this.loadingController.create({
      message: 'Loading...',
      // duration: 3000,
      spinner: 'circles'
    });
    await this.loading.present();
    let metal:any =[]
    console.log(this.metal['Selling_branch'],'metal')
    if(this.metal['Selling_branch'].length === 0){
      metal = undefined
    }else{
      this.metal['Selling_branch'].forEach((element:any) => {
         metal.push(element['id_metal'])
      });
    }
    this.common.topselling({"id_branch":this.empData['Selling_branch'],"from_date":this.from_date['Selling_branch'],"to_date":this.to_date['Selling_branch'],'id_metal':metal }).subscribe(async res =>{
      if(res['app_response_data'] != ''){
        this.piexValues = res['app_response_data']['label'];
        this.pieyValues = res['app_response_data']['value'];
        this.piebarColors = res['app_response_data']['colour_code']
        this.xvalues = res['data']
        const productsInKilograms = this.xvalues.map((product:any) => ({
          product_name: product.product_name,
          wt: this.gramsToOtherUnits(parseFloat(product.wt)), // Parse stock_wt to number
          pcs: parseInt(product.pcs) // Parse stock_pcs to number
        }));
        this.xvalues=[]
        this.xvalues=productsInKilograms
        console.log(this.piexValues,'label');
        console.log(this.xvalues,'label');

        // this.showSpinner = false;
      }else{
        this.piexValues = []
        this.pieyValues = []
        this.piebarColors = []
        console.log('top selling data is empty');
      }

      this.pie();
      await this.loading.dismiss();


    });


/*     this.common.topselling({"id_branch":'1',"from_date":this.from_date['Selling_branch'],"to_date":this.to_date['Selling_branch'] }).sub(data=>{
      this.piexValues = data['app_response_data']['label'];
      this.pieyValues = data['app_response_data']['value'];
      this.piebarColors = data['app_response_data']['colour_code']
      this.testpie();
        }); */
      console.log('Delete');
  }

  public barchart11: Partial<ChartOptions> []=[]
  async get_StoreWiseSales(branch:any,date:any){
    this.branch_list = branch
   this.empData['StoreWiseSales'] = branch[0].id_branch
   this.empdata1['StoreWiseSales'] = branch[0].name;
    this.to_date['StoreWiseSales'] = date['to']
    this.from_date['StoreWiseSales'] = date['from']
    this.formattedDate = this.formatDate(this.from_date['StoreWiseSales'],this.to_date['StoreWiseSales']);

    this.loading = await this.loadingController.create({
      message: 'Loading...',
      // duration: 3000,
      spinner: 'circles'
    });
    await this.loading.present();
    let metal:any =[]
    console.log(this.metal['StoreWiseSales'],'metal')
    if(this.metal['StoreWiseSales'].length === 0){
      metal = undefined
    }else{
      this.metal['StoreWiseSales'].forEach((element:any) => {
         metal.push(element['id_metal'])
      });
    }

    this.common.store({"id_branch":this.empData['StoreWiseSales'],"from_date":this.from_date['StoreWiseSales'],"to_date":this.to_date['StoreWiseSales'],'id_metal':metal }).subscribe(async data=>{
      if(data['responsedata'] != null){
      this.branch = data['responsedata'];
      const formatter:any = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
      const value = 200000
      formatter.format(value) ;
      this.total = 0;
      this.barchart11 =[]
      this.branch.forEach((element:any)=>{
        this.total = (parseFloat(this.total) + parseFloat(element['branch_sales'])).toFixed(2)
        element['branch_sales'] = formatter.format(parseFloat(element['branch_sales']).toFixed(2));

        const newChartOptions = {
          series: [
            {
              name: "Actual",
              data: [element['branch_sales_percentage']] // Add your data here
            }
          ],
          chart: {
            height: 80,
            type: "bar",
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          xaxis: {
            show: false, // Hide x-axis line and ticks
            labels: {
              show: false // Hide x-axis labels
            }
          },
          yaxis: {
            show: false, // Hide y-axis line and ticks
            labels: {
              show: false // Hide y-axis labels
            }
          },
          stroke: {
            width: 0 // Hide the line by setting its width to 0
          },
          grid: {
            borderColor: "transparent" // Hide grid border color
          },
          colors: [element['colour_code']],
          // Other options as per your requirements
        };

        this.barchart11.push(newChartOptions);
      });

      console.log(this.barchart11,'chart');

      this.total = formatter.format(this.total);


    }
    else{
      console.log('store wise sale empty');
      this.branch =[]

    }
      console.log(parseFloat(this.total).toFixed(1));
      await this.loading.dismiss();

      });


  }

  async get_BestSellers(branch:any,date:any){
    this.branch_list = branch
    this.empData['BestSellers_branch'] = branch[0].id_branch
    this.empdata1['BestSellers_branch'] = branch[0].name;
    this.to_date['BestSellers_branch'] = date['to']
    this.from_date['BestSellers_branch'] = date['from']
    this.formattedDate = this.formatDate(this.from_date['BestSellers_branch'],this.to_date['BestSellers_branch']);

  console.log(this.empData['BestSellers_branch'],this.to_date['BestSellers_branch'],this.from_date['BestSellers_branch'],'bm');
  this.loading = await this.loadingController.create({
    message: 'Loading...',
    // duration: 3000,
    spinner: 'circles'
  });
  await this.loading.present();
  let metal:any =[]
    console.log(this.metal['BestSellers_branch'],'metal')
    if(this.metal['BestSellers_branch'].length === 0){
      metal = undefined
    }else{
      this.metal['BestSellers_branch'].forEach((element:any) => {
         metal.push(element['id_metal'])
      });
    }
    this.common.topsellers({"id_branch":this.empData['BestSellers_branch'],"from_date": this.from_date['BestSellers_branch'] ,"to_date":this.to_date['BestSellers_branch'],'id_metal':metal}).subscribe(async data=>{
      if(data['app_response_data'] != ''){
      this.bpiexValues = data['app_response_data']['label'];
      this.bpieyValues = data['app_response_data']['value'];
      this.bpiebarColors = data['app_response_data']['colour_code']
      this.yvalues = data['data']
      const productsInKilograms = this.yvalues.map((product:any) => ({
        product_name: product.karigar_name,
        wt: this.gramsToOtherUnits(parseFloat(product.wt)), // Parse stock_wt to number
        pcs: parseInt(product.pcs) // Parse stock_pcs to number
      }));
      this.yvalues=[]
      this.yvalues=productsInKilograms
      console.log(this.bpiexValues,'label');
      }
      else{
        this.bpiexValues = []
        this.bpieyValues = []
        this.bpiebarColors = []
        console.log('seller data is empty');

      }
      this.pie1();
    await this.loading.dismiss();


        });

  }

  async get_EmployeeSale(branch:any,date:any){
    this.branch_list = branch
    this.empdata1['employee_branch'] = branch[0].name;
   this.empData['employee_branch'] = branch[0].id_branch
   this.from_date['employee_chart'] = date['from']
   this.to_date['employee_chart'] = date['to']
   this.formattedDate = this.formatDate(this.from_date['employee_chart'],this.to_date['employee_chart']);
   this.loading = await this.loadingController.create({
    message: 'Loading...',
    // duration: 3000,
    spinner: 'circles'
  });
  await this.loading.present();
  let metal:any =[]
    console.log(this.metal['employee_branch'],'metal')
    if(this.metal['employee_branch'].length === 0){
      metal = undefined
    }else{
      this.metal['employee_branch'].forEach((element:any) => {
         metal.push(element['id_metal'])
      });
    }
    this.common.getEmployeeSales({"id_branch":this.empData['employee_branch'] ,"from_date":this.from_date['employee_chart'],"to_date":this.to_date['employee_chart'],'id_metal':metal }).subscribe(async res =>{
      if(res['app_response_data'] != null){
      this.emp_bbpiexValues = res['app_response_data']['label'];
      this.emp_bbpieyValues = res['app_response_data']['value'];
      this.emp_bbpiebarColors = res['app_response_data']['colour_code']
      this.emp_values = res['data']
      const productsInKilograms = this.emp_values.map((product:any) => ({
        emp_name: product.emp_name,
        emp_sales: this.gramsToOtherUnits(parseFloat(product.emp_sales)), // Parse stock_wt to number// Parse stock_pcs to number
      }));
      this.emp_values=[]
      this.emp_values=productsInKilograms
      console.log(this.emp_bbpiexValues,'label');
      }
      else{
        this.emp_bbpiexValues = []
        this.emp_bbpieyValues = []
        this.emp_bbpiebarColors = []
        console.log('employee data empty');

      }
    this.pie3();
    await this.loading.dismiss();


    });


  }


  async get_CustomerSale(branch:any,date:any){
    this.branch_list = branch
    this.empdata1['customer_branch'] = branch[0].name;
   this.empData['customer_branch'] = branch[0].id_branch
   this.from_date['cus_chart'] = date['from']
   this.to_date['cus_chart'] = date['to']
   this.formattedDate = this.formatDate(this.from_date['cus_chart'],this.to_date['cus_chart']);
   this.loading = await this.loadingController.create({
    message: 'Loading...',
    // duration: 3000,
    spinner: 'circles'
  });
  await this.loading.present();
  let metal:any =[]
    console.log(this.metal['customer_branch'],'metal')
    if(this.metal['customer_branch'].length === 0){
      metal = undefined
    }else{
      this.metal['customer_branch'].forEach((element:any) => {
         metal.push(element['id_metal'])
      });
    }
    this.common.getCustomerSales({"id_branch":this.empData['customer_branch'],"from_date":this.from_date['cus_chart'],"to_date":this.to_date['cus_chart'],'id_metal':metal }).subscribe(async res =>{
      if(res['app_response_data'] != null){
      this.cus_bbpiexValues = res['app_response_data']['label'];
      this.cus_bbpieyValues = res['app_response_data']['value'];
      this.cus_values = res['data'];
      this.cus_bbpiebarColors = res['app_response_data']['colour_code']
      console.log(this.cus_bbpiexValues,'label');
      }
      else{
        this.cus_bbpiexValues = []
        this.cus_bbpieyValues = []
        this.cus_bbpiebarColors = []
        console.log('employee data empty');
      }
    this.pie5();
    await this.loading.dismiss();


    });


  }

  async get_SectionSale(branch:any,date:any){
    this.branch_list = branch
    this.empdata1['section'] = branch[0].name;
   this.empData['section'] = branch[0].id_branch
   this.from_date['section_chart'] = date['from']
   this.to_date['section_chart'] = date['to']
   this.formattedDate = this.formatDate(this.from_date['section_chart'],this.to_date['section_chart']);

   this.loading = await this.loadingController.create({
    message: 'Loading...',
    // duration: 3000,
    spinner: 'circles'
  });
  await this.loading.present();
  let metal:any =[]
  console.log(this.metal['section'],'metal')
  if(this.metal['section'].length === 0){
    metal = undefined
  }else{
    this.metal['section'].forEach((element:any) => {
       metal.push(element['id_metal'])
    });
  }
    this.common.getSectionSales({"id_branch":this.empData['section'],"from_date":this.from_date['section_chart'],"to_date":this.to_date['section_chart'],'id_metal':metal }).subscribe(async res =>{
      if(res['app_response_data'] != null){
      this.sec_bbpiexValues = res['app_response_data']['label'];
      this.sec_bbpieyValues = res['app_response_data']['value'];
      this.sec_bbpiebarColors = res['app_response_data']['colour_code']
      this.sec_values = res['data']
      const productsInKilograms = this.sec_values.map((product:any) => ({
        section_name: product.section_name,
        section_sales: this.gramsToOtherUnits(parseFloat(product.section_sales)), // Parse stock_wt to number// Parse stock_pcs to number
      }));
      this.sec_values=[]
      this.sec_values=productsInKilograms
      }else {
        console.log('section data empty');
        this.sec_bbpiexValues = []
        this.sec_bbpieyValues = []
        this.sec_bbpiebarColors = []

      }
    this.pie4();
    await this.loading.dismiss();




    });


  }



    xvalues:any= [];
    pie(){
      console.log(this.piexValues);
      console.log(this.pieyValues);

      this.chartOptions = {
        series:this.pieyValues,
        chart: {
          width: 450,
          type: "pie",
          height: 300,


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
                fontSize: '10px',
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
          offsetY: 15,  // Adjust the top offset
          offsetX: 10,   // Adjust the right offset
          fontSize: '10px',
          fontWeight: 100,
          width: 150,
           colors: '#000000',
        labels: {
          colors: '#000000',
        },
        },
        colors:this.piebarColors,


      };



  let percent:any =[]
  // this.xvalues =[]
      // this.piexValues.forEach((label:any, index:any) => {
      //   var percentage = ((this.pieyValues[index] / this.pieyValues.reduce((a:any, b:any) => a + b, 0)) * 100).toFixed(2) + "%";
      //   console.log(percentage);
      //   percent.push(percentage)
      //   var legendItem = document.createElement("div");
      //   legendItem.innerHTML = label + ": " + percentage;

      // });
      // for (var i = 0; i < this.piexValues.length; i++) {
      //   // xvalues['name'] = this.piexValues[i];
      //   // xvalues['percent'] = percent[i];
      //   this.xvalues.push({ name: this.piexValues[i], percent: percent[i] });



      // }

      console.log(this.xvalues);


    }

    yvalues: any = [];
    pie1(){
      console.log(this.bpiexValues);
      console.log(this.bpieyValues);

      this.bestsellers = {
        labels: this.bpiexValues,
        series: this.bpieyValues,
        chart: {
          width: 450,
          type: "pie",
          height: 300,
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
          fontSize: '10px',
          fontWeight: 100,
          width:145,
           colors: '#000000',
        labels: {
          colors: '#000000',
        },
        },

        colors:this.bpiebarColors,
        // ... other configurations for the second chart
      };

      let percent:any =[]
      // this.yvalues =[]
      //     this.bpiexValues.forEach((label:any, index:any) => {
      //       var percentage = ((this.bpieyValues[index] / this.bpieyValues.reduce((a:any, b:any) => a + b, 0)) * 100).toFixed(2) + "%";
      //       console.log(percentage);
      //       percent.push(percentage)
      //       var legendItem = document.createElement("div");
      //       legendItem.innerHTML = label + ": " + percentage;

      //     });
      //     for (var i = 0; i < this.bpiexValues.length; i++) {
      //       // xvalues['name'] = this.piexValues[i];
      //       // xvalues['percent'] = percent[i];
      //       this.yvalues.push({ name: this.bpiexValues[i], percent: percent[i] });
      //     }
      //     console.log(this.yvalues);
    }


    sec_values:any = [];
    pie4(){
      console.log(this.sec_bbpiexValues);
      console.log(this.sec_bbpieyValues);
      this.sectionchart = {
        series:this.sec_bbpieyValues,
        chart: {
          width: 450,
          type: "pie",
          height: 300,


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
          offsetX: 10,   // Adjust the right offset
          fontSize: '10px',
          fontWeight: 100,
          width:160,
           colors: '#000000',
        labels: {
          colors: '#000000',
        },
        },
        colors:this.sec_bbpiebarColors,


      };



  let percent:any =[]
  // this.sec_values =[]
  //     this.sec_bbpiexValues.forEach((label:any, index:any) => {
  //       var percentage = ((this.sec_bbpieyValues[index] / this.sec_bbpieyValues.reduce((a:any, b:any) => a + b, 0)) * 100).toFixed(2) + "%";
  //       console.log(percentage);
  //       percent.push(percentage)
  //       var legendItem = document.createElement("div");
  //       legendItem.innerHTML = label + ": " + percentage;

  //     });
  //     for (var i = 0; i < this.sec_bbpiexValues.length; i++) {
  //       // xvalues['name'] = this.piexValues[i];
  //       // xvalues['percent'] = percent[i];
  //       this.sec_values.push({ name: this.sec_bbpiexValues[i], percent: percent[i] });



  //     }

  //     console.log(this.sec_values);


    }

    emp_values:any= [];
    pie3(){
      console.log(this.emp_bbpiexValues);
      console.log(this.emp_bbpieyValues);
      this.employeechart = {
        series:this.emp_bbpieyValues,
        chart: {
          width: 450,
          type: "pie",
          height: 300,


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
          width:145,
           colors: '#000000',
        labels: {
          colors: '#000000',
        },
        },
        colors:this.emp_bbpiebarColors,


      };



  let percent:any =[]
  // this.emp_values =[]
  //     this.emp_bbpiexValues.forEach((label:any, index:any) => {
  //       var percentage = ((this.emp_bbpieyValues[index] / this.emp_bbpieyValues.reduce((a:any, b:any) => a + b, 0)) * 100).toFixed(2) + "%";
  //       console.log(percentage);
  //       percent.push(percentage)
  //       var legendItem = document.createElement("div");
  //       legendItem.innerHTML = label + ": " + percentage;

  //     });
  //     for (var i = 0; i < this.emp_bbpiexValues.length; i++) {
  //       // xvalues['name'] = this.piexValues[i];
  //       // xvalues['percent'] = percent[i];
  //       this.emp_values.push({ name: this.emp_bbpiexValues[i], percent: percent[i] });



  //     }

  //     console.log(this.emp_values);


    }
    cus_values:any = [];
    pie5(){
      console.log(this.cus_bbpiexValues);
      console.log(this.cus_bbpieyValues);
      this.customerchart = {
        series:this.cus_bbpieyValues,
        chart: {
          width: 450,
          type: "pie",
          height: 300,

        },
        labels:this.cus_bbpiexValues,

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
          width:145,
           colors: '#000000',
        labels: {
          colors: '#000000',
        },
        },
        colors:this.cus_bbpiebarColors,


      };



  let percent:any =[]
  // this.cus_values =[]
  //     this.cus_bbpiexValues.forEach((label:any, index:any) => {
  //       var percentage = ((this.cus_bbpieyValues[index] / this.cus_bbpieyValues.reduce((a:any, b:any) => a + b, 0)) * 100).toFixed(2) + "%";
  //       console.log(percentage);
  //       percent.push(percentage)
  //       var legendItem = document.createElement("div");
  //       legendItem.innerHTML = label + ": " + percentage;

  //     });
  //     for (var i = 0; i < this.cus_bbpiexValues.length; i++) {
  //       // xvalues['name'] = this.piexValues[i];
  //       // xvalues['percent'] = percent[i];
  //       this.cus_values.push({ name: this.cus_bbpiexValues[i], percent: percent[i] });



  //     }

      console.log(this.cus_values);


    }

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
      }
      else if(type == 'best_seller'){
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
      // else if(type == 'stock_chart'){
      //   console.log('changed: ', e);
      //   const index = e.target.swiper.activeIndex
      //   console.log(index,'kkkkkk');
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
      // }
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
      this.closePopover()
      console.log(this.from);
      console.log(type);
      this.today = true
      if(type == 'top_selling'){
        this.date1['from'] = this.from_date['Selling_branch']
        this.date1['to'] = this.to_date['Selling_branch']
        this.get_SalesPrdoucts(this.common_branch,this.date1)
      }else if(type == 'best_seller'){
        this.date1['from'] = this.from_date['BestSellers_branch']
        this.date1['to'] = this.to_date['BestSellers_branch']
        this.get_BestSellers(this.common_branch,this.date1)
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
      else if(type == 'StoreWiseSales'){
        this.date1['from'] = this.from_date['StoreWiseSales']
        this.date1['to'] = this.to_date['StoreWiseSales']
        this.get_StoreWiseSales(this.common_branch,this.date1)
      }
      else if(type == 'cus_chart'){
        this.date1['from'] = this.from_date['cus_chart']
        this.date1['to'] = this.to_date['cus_chart']
        this.get_CustomerSale(this.common_branch,this.date1)
      }




    }

    onDateChange_to(type:any) {
     console.log(this.to);
     console.log(type);
     this.closePopover()
     this.today = true
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
    else if(type == 'StoreWiseSales'){
      this.date1['from'] = this.from_date['StoreWiseSales']
      this.date1['to'] = this.to_date['StoreWiseSales']
      this.get_StoreWiseSales(this.common_branch,this.date1)
    }
    else if(type == 'cus_chart'){
      this.date1['from'] = this.from_date['cus_chart']
      this.date1['to'] = this.to_date['cus_chart']
      this.get_CustomerSale(this.common_branch,this.date1)
    }
   }

   message:any
   async openModal(temp:any) {
     this.get_filter(temp,null)
     this.loading = await this.loadingController.create({
       message: 'Loading...',
       // duration: 3000,
       spinner: 'circles'
     });
     const modal = await this.modalCtrl.create({
       component: BranchShowComponent, componentProps: {
         data: this.branch1 // Pass the data object
       }

     });
     modal.present();

     const { data, role } = await modal.onWillDismiss();
     await this.loading.dismiss();
    //  this.get_branchfilter(data)

     if (role === 'confirm') {
       console.log(data,'id');

     }
     this.get_filter(temp,data)
   }

   get_branchfilter(temp:any){
    let data:any=[temp['branch']]
    if(this.esti_type == 1){
      this.get_Monthlysales(data)
    }else if(this.esti_type == 2){
      this.get_StoreWiseSales(data,this.date1)
    }else if(this.esti_type == 3){
      this.metal['Selling_branch'] = data['metal']
      this.get_SalesPrdoucts(data,this.date1)
    }
    else if(this.esti_type == 4){
      this.get_BestSellers(data,this.date1)
    }
    else if(this.esti_type == 5){
      this.get_SectionSale(data,this.date1)
    }
    else if(this.esti_type == 6){
      this.get_EmployeeSale(data,this.date1)
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


  branch1:any={'id_branch':'','temp':'','metal':[]}
  get_filter(temp:any,data:any){
    // let branch=[]
    if(temp == 22){
      this.branch1['id_branch'] = this.month_branch
      this.branch1['temp'] = temp
      this.branch1['metal']= this.metal['Month_Sales']
      if(data != null){
        // branch.push(data['branch'])
        this.metal['Month_Sales']= data['metal']
        console.log(this.metal['Month_Sales']);
        this.get_Monthlysales(data['branch'])
      }
    }else if(temp == 2){
      this.branch1['id_branch'] = this.empData['StoreWiseSales']
      this.branch1['temp'] = temp
      this.branch1['metal'] = this.metal['StoreWiseSales']
      if(data != null){
        // branch.push(data['branch'])
        this.metal['StoreWiseSales']= data['metal']
        console.log(this.metal['StoreWiseSales']);
        this.get_StoreWiseSales(data['branch'],this.date1)
      }
    }else if(temp == 3){
      this.branch1['id_branch'] =  this.empData['Selling_branch']
      this.branch1['temp'] = temp
      this.branch1['metal'] = this.metal['Selling_branch']
      if(data != null){
        // branch.push(data['branch'])
        this.metal['Selling_branch']= data['metal']
        console.log(this.metal['Selling_branch']);
        this.get_SalesPrdoucts(data['branch'],this.date1)
      }
    }
    else if(temp == 4){
      this.branch1['id_branch'] =  this.empData['BestSellers_branch']
      this.branch1['temp'] = temp
      this.branch1['metal'] = this.metal['BestSellers_branch']
      if(data != null){
        // branch.push(data['branch'])
        this.metal['BestSellers_branch']= data['metal']
        console.log(this.metal['BestSellers_branch']);
        this.get_BestSellers(data['branch'],this.date1)

      }
    }
    else if(temp == 5){
      this.branch1['id_branch'] = this.empData['section']
      this.branch1['temp'] = temp
      this.branch1['metal'] = this.metal['section']
      if(data != null){
        // branch.push(data['branch'])
         this.metal['section']= data['metal']
        console.log( this.metal['section']);
        this.get_SectionSale(data['branch'],this.date1)

      }
    }else if(temp == 6){
      this.branch1['id_branch'] = this.empData['employee_branch']
      this.branch1['temp'] = temp
      this.branch1['metal'] = this.metal['employee_branch']
      if(data != null){
        // branch.push(data['branch'])
        this.metal['employee_branch']= data['metal']
        console.log(this.metal['employee_branch']);
        this.get_EmployeeSale(data['branch'],this.date1)

      }
    }
    else if(temp == 7){
      this.branch1['id_branch'] = this.empData['customer_branch']
      this.branch1['temp'] = temp
      this.branch1['metal'] = this.metal['customer_branch']
      if(data != null){
        // branch.push(data['branch'])
        this.metal['customer_branch']= data['metal']
        console.log(this.metal['customer_branch']);
        this.get_CustomerSale(data['branch'],this.date1)

      }
    }
  }


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
        this.get_Monthlysales(this.branch_list)

      }else if(type == 2){
        this.get_StoreWiseSales(this.branch_list,this.date1)
        this.day['StoreWiseSales'] ='today'
      }else if(type == 3){
        this.get_SalesPrdoucts(this.branch_list,this.date1)
        this.day['Selling_branch'] ='today'
      }
      else if(type == 4){
        this.get_BestSellers(this.branch_list,this.date1)
        this.day['BestSellers_branch'] ='today'

      }
      else if(type == 5){
        this.get_SectionSale(this.branch_list,this.date1)
        this.day['section'] ='today'

      }
      else if(type == 6){
        this.get_EmployeeSale(this.branch_list,this.date1)
        this.day['employee_branch'] ='today'

      }
      else if(type == 7){
        this.get_CustomerSale(this.branch_list,this.date1)
        this.day['customer_branch'] ='today'

      }


    }else if(data == 'yest'){
      var date = new Date();
      var ddd = date.getDate();
      var mmm = date.getMonth() + 1;
      var yy = date.getFullYear();
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
        this.get_Monthlysales(this.branch_list)

      }else if(type == 2){
        this.get_StoreWiseSales(this.branch_list,this.date1)
        this.day['StoreWiseSales'] ='yesterday'
      }else if(type == 3){
        this.get_SalesPrdoucts(this.branch_list,this.date1)
        this.day['Selling_branch'] ='yesterday'
      }
      else if(type == 4){
        this.get_BestSellers(this.branch_list,this.date1)
        this.day['BestSellers_branch'] ='yesterday'

      }
      else if(type == 5){
        this.get_SectionSale(this.branch_list,this.date1)
        this.day['section'] ='yesterday'

      }
      else if(type == 6){
        this.get_EmployeeSale(this.branch_list,this.date1)
        this.day['employee_branch'] ='yesterday'

      }
      else if(type == 7){
        this.get_CustomerSale(this.branch_list,this.date1)
        this.day['customer_branch'] ='yesterday'

      }


    }
    else if(data == 'month'){

      var date = new Date();
      let today = new Date();

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
      // this.get_type(type)
      if(type == 1){
        this.get_Monthlysales(this.branch_list)

      }else if(type == 2){
        this.get_StoreWiseSales(this.branch_list,this.date1)
        this.day['StoreWiseSales'] ='Last Month'
      }else if(type == 3){
        this.get_SalesPrdoucts(this.branch_list,this.date1)
        this.day['Selling_branch'] ='Last Month'
      }
      else if(type == 4){
        this.get_BestSellers(this.branch_list,this.date1)
        this.day['BestSellers_branch'] ='Last Month'

      }
      else if(type == 5){
        this.get_SectionSale(this.branch_list,this.date1)
        this.day['section'] ='Last Month'

      }
      else if(type == 6){
        this.get_EmployeeSale(this.branch_list,this.date1)
        this.day['employee_branch'] ='Last Month'

      }
      else if(type == 7){
        this.get_CustomerSale(this.branch_list,this.date1)
        this.day['customer_branch'] ='Last Month'

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
        this.get_Monthlysales(this.branch_list)

      }else if(type == 2){
        this.get_StoreWiseSales(this.branch_list,this.date1)
        this.day['StoreWiseSales'] ='This Month'
      }else if(type == 3){
        this.get_SalesPrdoucts(this.branch_list,this.date1)
        this.day['Selling_branch'] ='This Month'
      }
      else if(type == 4){
        this.get_BestSellers(this.branch_list,this.date1)
        this.day['BestSellers_branch'] ='This Month'

      }
      else if(type == 5){
        this.get_SectionSale(this.branch_list,this.date1)
        this.day['section'] ='This Month'

      }
      else if(type == 6){
        this.get_EmployeeSale(this.branch_list,this.date1)
        this.day['employee_branch'] ='This Month'

      }
      else if(type == 7){
        this.get_CustomerSale(this.branch_list,this.date1)
        this.day['customer_branch'] ='This Month'

      }
    }
    }



  color_mode:any
  async ionViewWillEnter() {
    this.color_mode =await this.storage.get('color')
    console.log( this.color_mode,'mode');
    let empData = JSON.parse(await this.storage.get('empDetail'));
    console.log(empData,'emp');
    this.branch_list3['name']= empData['branch_name']
    this.branch_list3['id_branch']= empData['branch_id']

  }

  async closePopover() {
    await this.popoverController.dismiss();
  }


  ngOnInit() {
  }


  char(month:any,value:any,branch:any){

    const xValues = month; // Assuming you have x-axis values
  const data = branch.map((series:any) => ({
    name: series.name,
    data: series.value
  }));


    this.linechart1 = {
      series: data,
      chart: {
        height: 350,
        type: "line",
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
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      legend: {
        show: false  // Hide the legend
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
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
          text: "N.wt", // Title for the y-axis
          style: {
            color: '#444',
            fontSize: '14px',
            fontFamily: 'Arial'
          }
        },
        axisBorder: {
          show: true, // Show the y-axis border
          color: '#ccc', // Border color
          offsetX: -10 // Adjust the position of the border
        }

        // title: {
        //   text: "Price"
        // }

    },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val:any) {
                return val ;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };
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

          // title: {
          //   text: "Price"
          // }

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





    gramsToOtherUnits = (grams: number): string => {
      const si = [
        { v: 1E18, s: 'Eg' },
        { v: 1E15, s: 'Pg' },
        { v: 1E12, s: 'Tg' },
        { v: 1E9, s: 'Gg' },
        { v: 1E6, s: 'M' },
        { v: 1E3, s: 'K' },
        { v: 1, s: 'g' },
      ];

      // Find the appropriate SI prefix for the given weight
      let index = si.findIndex(unit => grams >= unit.v);

      // If no appropriate SI prefix is found, default to grams ('g')
      if (index === -1) {
        index = si.length - 1;
      }

      const convertedValue = (grams / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1');
      return convertedValue + ' ' + si[index].s;
    };


}




