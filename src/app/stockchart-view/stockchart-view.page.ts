import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Common1Service } from 'src/service/common1.service';
import Swiper from 'swiper';
import { AppComponent } from '../app.component';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis } from 'ng-apexcharts';
import { BranchShowComponent } from '../model/branch-show/branch-show.component';
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
  selector: 'app-stockchart-view',
  templateUrl: './stockchart-view.page.html',
  styleUrls: ['./stockchart-view.page.scss'],
  encapsulation: ViewEncapsulation.Emulated // or None

})



export class StockchartViewPage implements OnInit {

  presentingElement:any;
  branch_list1:any=[];
  common_branch:any
  // empData:any
  bbpiexValues:any=[];
  bbpieyValues:any=[];
  bbpiebarColors:any
  from:any;
	to:any;
  loading:any
  branch_list:any=[]
  branch_list3:any={'name':'','id_branch':''}
  estiStatus :any
  barxValues :any =[]
  baryValues:any =[]
  barbarColors:any
  bar2barColors:any;
  bar2xValues:any=[]
  bar2yValues:any=[]
  items:any[] = [];
  items1:any[] = [];
  showDropdown = false



  date1={'from':'','to':''}



  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  types:any=[{
    'approval_type':'1',
    'approval_name':'Stock'
  },
  {
    'approval_type':'2',
    'approval_name':'Estimation'
  },
  {
    'approval_type':'3',
    'approval_name':'Branch Wise Compare'
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

  public stockchart!: Partial<ChartOptions>
  public Estimation!: Partial<ChartOptions>
  public chartOptions1!: Partial<ChartOptions>


  foods = [
    {
      id: 1,
      name: 'Apples',
      type: 'fruit',
    },
    {
      id: 2,
      name: 'Carrots',
      type: 'vegetable',
    },
    {
      id: 3,
      name: 'Cupcakes',
      type: 'dessert',
    },
  ];

  selectedSegment:any
  esti_type:any ='1'
  public linechart!: Partial<ChartOptions>
  day={'Glance_branch':'today','Selling_branch':'today','SalesComparison_branch':'today','BestSellers_branch':'today','Stock_Chart':'today','Month_Sales':'today','Estimation_branch':'today','section':'today','employee_branch':'today','customer_branch':'today','BranchWiseCompersion':'today'}
  empData={'Glance_branch':'','Selling_branch':'','SalesComparison_branch':'','BestSellers_branch':'','Stock_Chart':'','Month_Sales':'','Estimation':'','financial':'','report':'','BranchWiseCompersion':''}
  empdata1={'Glance_branch':'','Selling_branch':'','SalesComparison_branch':'','BestSellers_branch':'','Stock_Chart':'','Month_Sales':'','Estimation_branch':''}
  from_date:any = {'Glance_branch':'',"Selling_branch":"","SalesComparison_branch":"","BestSellers_branch":"","Stock_Chart":"","Month_Sales":'','StoreWiseSales':'','BranchWiseCompersion':'','Estimation':'','financial':'','employee_chart':'','section_chart':''};
  to_date:any = {'Glance_branch':'',"Selling_branch":"","SalesComparison_branch":"","BestSellers_branch":"","Stock_Chart":"","Month_Sales":'','StoreWiseSales':'','BranchWiseCompersion':'','Estimation':'','financial':'','employee_chart':'','section_chart':''};
  today = false
  formattedDate:any


  constructor(private popoverController: PopoverController,private storage: Storage,public router: Router,public common:Common1Service,private loadingController: LoadingController,public app:AppComponent,private modalCtrl: ModalController) {
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
     this.branch_list.push(this.branch_list3)
    //  this.branch_list =  this.branch_list1
     this.get_StockChart(this.branch_list,this.date1)
    //  await this.loading.dismiss();
     });
   }

   compareWith(o1:any, o2:any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  handleChange(ev:any) {
    console.log('Current value:', JSON.stringify(ev.target.value));
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
      this.day['Stock_Chart'] ='today'
      this.get_StockChart(this.branch_list,this.date1)
    }else if(this.esti_type == 2){
      this.day['Estimation_branch'] ='today'
      this.get_estimationstatus(this.branch_list,this.date1)
    }else if(this.esti_type == 3){
      this.day['BranchWiseCompersion'] ='today'
      this.get_BranchCompare(this.branch_list,this.date1)
    }


  }

  openpage(){
    this.router.navigate(['/home'])

  }

  test:any;
  swiperSlideChanged(e: any,type:any) {
    this.test =  e.target.swiper.activeIndex
    if(type == 'stock_chart'){
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
      this.get_StockChart(branch_inx,this.date1)
      }
    }
  }

  async get_StockChart(branch:any,date:any){
    // this.empdata1['Selling_branch'] = branch.name;
    this.branch_list = branch
    this.branch_name = branch[0].name
   this.empData['Stock_Chart'] = branch[0].id_branch
   this.from_date['Stock_Chart'] = date['from']
   this.to_date['Stock_Chart'] = date['to']
   this.formattedDate = this.formatDate(this.from_date['Stock_Chart'],this.to_date['Stock_Chart']);
   this.loading = await this.loadingController.create({
    message: 'Loading...',
    // duration: 3000,
    spinner: 'circles'
  });
  await this.loading.present();
  let metal:any =[]
    console.log(this.stock_metal,'metal')
    if(this.stock_metal.length === 0){
      metal = undefined
    }else{
      this.stock_metal.forEach((element:any) => {
         metal.push(element['id_metal'])
      });
    }
    this.common.getStockChart({"id_branch":this.empData['Stock_Chart'],"from_date":this.from_date['Stock_Chart'],"to_date":this.to_date['Stock_Chart'],"id_metal":metal}).subscribe(async res =>{
      if(res['app_response_data'] != null){
      this.bbpiexValues = res['app_response_data']['label'];
      this.bbpieyValues = res['app_response_data']['value'];
      this.bbpiebarColors = res['app_response_data']['colour_code']
      this.zvalues = res['data']
      const productsInKilograms = this.zvalues.map((product:any) => ({
        product_name: product.product_name,
        stock_wt: this.gramsToKilograms(parseFloat(product.stock_wt)), // Parse stock_wt to number
        stock_pcs: parseInt(product.stock_pcs) // Parse stock_pcs to number
      }));
      this.zvalues=[]
      this.zvalues=productsInKilograms
      console.log(this.zvalues);

      console.log(this.bbpiexValues,'label');
      this.pie2();
      }else{
        this.bbpiexValues = []
        this.bbpieyValues = []
        this.bbpiebarColors = []
        console.log('stock chart data empty');
      }
      await this.loading.dismiss();

    });

  }

  dropdownChange(data:any){
    console.log(data,'k');

  }

  async get_estimationstatus(branch:any,date:any){
    this.branch_list = branch
    this.esti_branch = branch[0].name
    this.empData['Estimation'] = branch[0].id_branch
    this.from_date['Estimation'] = date['from']
    this.to_date['Estimation'] = date['to']
    this.formattedDate = this.formatDate(this.from_date['Estimation'],this.to_date['Estimation']);
    this.loading = await this.loadingController.create({
      message: 'Loading...',
      // duration: 3000,
      spinner: 'circles'
    });
    await this.loading.present();
    let metal:any =[]
    console.log(this.esti_metal,'metal')
    if(this.esti_metal.length === 0){
      metal = undefined
    }else{
      this.esti_metal.forEach((element:any) => {
         metal.push(element['id_metal'])
      });
    }
    this.common.getEstimationStatus({"id_branch":this.empData['Estimation'],"from_date":this.from_date['Estimation'],"to_date":this.to_date['Estimation'],"id_metal":metal}).subscribe(async data=>{
      if(data['response_data'] != null){
        this.estiStatus = data['response_data'];
        this.barxValues = data['response_data']['label'];
        this.baryValues = data['response_data']['value'];
        this.barbarColors = data['response_data']['colour_code'];
        this.barchart2()
      }else{
        this.barxValues = []
        this.baryValues = []
        this.barbarColors = []
        console.log('estimation data empty');

      }
      await this.loading.dismiss();


        });
  }

  async get_BranchCompare(branch:any,date:any){
    // this.empdata1['Selling_branch'] = branch.name;
    this.branch_list = branch
    this.branch_compare = branch[0].name
   this.empData['BranchWiseCompersion'] = branch[0].id_branch
   this.from_date['BranchWiseCompersion'] = date['from']
   this.to_date['BranchWiseCompersion'] = date['to']
   this.formattedDate = this.formatDate(this.from_date['BranchWiseCompersion'],this.to_date['BranchWiseCompersion']);
   this.loading = await this.loadingController.create({
    message: 'Loading...',
    // duration: 3000,
    spinner: 'circles'
  });
  await this.loading.present();
  let metal:any =[]
  console.log(this.branch_metal,'metal')
  if(this.branch_metal.length === 0){
    metal = undefined
  }else{
    this.branch_metal.forEach((element:any) => {
       metal.push(element['id_metal'])
    });
  }
    this.common.getBranchCompare({"id_branch":this.empData['BranchWiseCompersion'],"from_date":this.from_date['BranchWiseCompersion'],"to_date":this.to_date['BranchWiseCompersion'],"id_metal":metal }).subscribe(async res =>{
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
    this.bar2xValues = []
    this.bar2yValues =[]
    this.bar2barColors =  []
    console.log('branch compare data is empty');

  }
  await this.loading.dismiss();

    });

  }

  zvalues:any = [];
  pie2(){
    console.log(this.bbpiexValues);
    console.log(this.bbpieyValues);

    this.stockchart = {
      series:this.bbpieyValues,
      chart: {
        width: 400,
        type: "pie",
        height: 250,


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
        offsetY: 15,  // Adjust the top offset
        offsetX: 5,   // Adjust the right offset
        fontSize: '12px',
        fontWeight: 100,
        width: '35%',
        colors: '#000000',
        labels: {
          colors: '#000000',
        },
      },
      colors:this.bbpiebarColors,


    };



let percent:any =[]
// this.zvalues =[]
//     this.bbpiexValues.forEach((label:any, index:any) => {
//       var percentage = ((this.bbpieyValues[index] / this.bbpieyValues.reduce((a:any, b:any) => a + b, 0)) * 100).toFixed(2) + "%";
//       console.log(percentage);
//       percent.push(percentage)
//       var legendItem = document.createElement("div");
//       legendItem.innerHTML = label + ": " + percentage;

//     });
//     for (var i = 0; i < this.bbpiexValues.length; i++) {
//       // xvalues['name'] = this.piexValues[i];
//       // xvalues['percent'] = percent[i];
//       this.zvalues.push({ name: this.bbpiexValues[i], percent: percent[i] });



//     }

    console.log(this.zvalues);


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
      colors:this.barbarColors,

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

        },
        title: {
          text: "Estimation count", // Title for the y-axis
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

        }, title: {
          text: "Amount", // Title for the y-axis
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

    },
  }

  }
 message:any
stock_metal:any=[]
esti_metal:any=[]
branch_metal:any=[]
  async openModal(temp:any) {
    let branch1:any={'id_branch':'','temp':'','metal':[]}
    if(temp == 1){
      branch1['id_branch'] = this.empData['Stock_Chart']
      branch1['temp'] = temp
      branch1['metal']=this.stock_metal
    }else if(temp == 2){
      branch1['id_branch'] = this.empData['Estimation']
      branch1['temp'] = temp
      branch1['metal'] = this.esti_metal
    }else if(temp == 3){
      branch1['id_branch'] = this.empData['BranchWiseCompersion']
      branch1['temp'] = temp
      branch1['metal'] = this.branch_metal
    }
    this.loading = await this.loadingController.create({
      message: 'Loading...',
      // duration: 3000,
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

    if(temp == 1 && data != null){
      // branch.push(data['branch'])
      this.stock_metal = data['metal']
      console.log(this.stock_metal);
      this.get_StockChart(data['branch'],this.date1)
    }else if(temp == 2 && data != null){
      // branch.push(data['branch'])
      this.esti_metal = data['metal']
      console.log(this.esti_metal);
      this.get_estimationstatus(data['branch'],this.date1)
    }
    else if(temp == 3 && data != null){
      // branch.push(data['branch'])
      this.branch_metal = data['metal']
      console.log(this.branch_metal);
      this.get_BranchCompare(data['branch'],this.date1)
    }
  }

  ngOnInit() {

    this.presentingElement = document.querySelector('.ion-page');
  }

branch_name:any
esti_branch:any
branch_compare:any
  get_branchfilter(temp:any){
    let data:any=[temp]
    if(this.esti_type == 1){
      this.get_StockChart(data,this.date1)
    }else if(this.esti_type == 2){
      this.get_estimationstatus(data,this.date1)
    }else if(this.esti_type == 3){
      this.get_BranchCompare(data,this.date1)
    }

  }


  onDateChange_from(type:any) {
    this.closePopover()
    console.log(this.from);
    console.log(type);
    this.today = true
     if(type == 'stock_chart'){
      this.date1['from'] = this.from_date['Stock_Chart']
      this.date1['to'] = this.to_date['Stock_Chart']
      this.get_StockChart(this.common_branch,this.date1)
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
  }

  onDateChange_to(type:any) {
    this.closePopover()
    console.log(this.to);
    this.today = true
    console.log(type);
    this.date1['from'] = this.from
    this.date1['to'] = this.to
     if(type == 'stock_chart'){
      this.date1['from'] = this.from_date['Stock_Chart']
      this.date1['to'] = this.to_date['Stock_Chart']
      this.get_StockChart(this.common_branch,this.date1)
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
        this.get_StockChart(this.branch_list,this.date1)
        this.day['Stock_Chart'] ='today'
      }else if(type == 2){
        this.get_estimationstatus(this.branch_list,this.date1)
        this.day['Estimation_branch'] ='today'
      }else if(type == 3){
        this.get_BranchCompare(this.branch_list,this.date1)
        this.day['BranchWiseCompersion'] ='today'


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
        this.get_StockChart(this.branch_list,this.date1)
        this.day['Stock_Chart'] ='yesterday'
      }else if(type == 2){
        this.get_estimationstatus(this.branch_list,this.date1)
        this.day['Estimation_branch'] ='yesterday'
      }else if(type == 3){
        this.get_BranchCompare(this.branch_list,this.date1)
        this.day['BranchWiseCompersion'] ='yesterday'


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
      if(type == 1){
        this.get_StockChart(this.branch_list,this.date1)
        this.day['Stock_Chart'] ='Last Month'
      }else if(type == 2){
        this.get_estimationstatus(this.branch_list,this.date1)
        this.day['Estimation_branch'] ='Last Month'
      }else if(type == 3){
        this.get_BranchCompare(this.branch_list,this.date1)
        this.day['BranchWiseCompersion'] ='Last Month'


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
      console.log(this.date1,'This Month');
      if(type == 1){
        this.get_StockChart(this.branch_list,this.date1)
        this.day['Stock_Chart'] ='This Month'
      }else if(type == 2){
        this.get_estimationstatus(this.branch_list,this.date1)
        this.day['Estimation_branch'] ='This Month'
      }else if(type == 3){
        this.get_BranchCompare(this.branch_list,this.date1)
        this.day['BranchWiseCompersion'] ='This Month'
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




    gramsToKilograms = (grams: number): string => {
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
