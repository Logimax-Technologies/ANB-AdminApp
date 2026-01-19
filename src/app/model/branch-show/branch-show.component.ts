import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Common1Service } from 'src/service/common1.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-branch-show',
  templateUrl: './branch-show.component.html',
  styleUrls: ['./branch-show.component.scss'],
})
export class BranchShowComponent  implements OnInit {

  branch:any[] = [];
  sebranch:any[] = [];
  empData:any
  types:any=[]

  branch_show = true
  metal_show = false
 types1:any[] =[]
ind = 0;
ind1 = 0;
select_metal:any[] = []
temp_branch:any=[]
month_wise = false
fin_metal:any=[] =[]
fin_metal1:any=[]=[]

select_branch:any = {'branch':[],'metal':[]}

fin:any


 category=['Branch','Metal']
  constructor(public common:Common1Service,private storage: Storage,private modalCtrl: ModalController,public viewCtrl:NavController,public navCtrl: NavController, public navParams: NavParams) {
    this.get_coverupreport()
    this.types1 = this.types
    console.log(this.empData,'data');

    console.log(this.empData);


  }

  async get_coverupreport(){
    this.empData = JSON.parse(await this.storage['get']('empDetail'))
    console.log(this.empData,'j');
    if(this.empData['branch_id'] != 0){

      let temp:any = this.empData['branch_id'];
      let spl:any[] = temp.split(',');
      console.log(spl);
      let final:any[] = [];

      spl.forEach(element => {

       let two:any[] = this.branch.filter(data=> data['id_branch'] == element);

       if(two.length > 0){
        final.push(two[0]);

       }
      });
      this.branch = final;
      this.sebranch = final;

      console.log(final);

    }
    let temp1 = this.navParams.get('data');
    this.fin=this.navParams.get('data')
    console.log(temp1,'h');
    console.log(this.fin['temp'],'h');
    this.get_branch(temp1)
    this.get_metal(temp1)
    this.get_metal1(temp1)
        if(temp1 == '1'){
          this.branch_show = true
        }else if(temp1 == '2'){
          this.metal_show = true
        }
    }

    get_metal1(data:any){

      this.common.metal().subscribe(async res =>{
        this.fin_metal = res['responsedata']
        this.fin_metal1 = res['responsedata']
        this.fin_metal.forEach((element:any,i:any)  => {
          element['status']= false
          if(data['metal'] != undefined){
            data['metal'].forEach((data1:any,i:any)  => {
              if(data1['id_metal']  == element['id_metal']){
                element['status'] = true
              }
            });
          }
        });
        if(data['metal'].length == 0){
          console.log(data['metal'],'kk');
          this.fin_metal[0]['status'] = true
        }

        console.log(this.fin_metal,'metal data');
      });
    }

    get_metal(data:any){
      this.common.getmetal().subscribe(async res =>{
        this.types = res['response_data']
        this.types1 = res['response_data']
        this.types.forEach((element:any,i:any)  => {
          if(data['metal'] != undefined){
            data['metal'].forEach((data1:any,i:any)  => {
              if(data1['id_metal']  == element['id_metal']){
                element['status'] = true
              }
            });
          }
        });
        console.log(this.types,'metal data');
      });
    }


    get_branch(data:any){
      this.common.getbranch().subscribe(async res =>{
        this.branch = res
        if(data['temp'] != 22){
          this.month_wise = false
          this.branch.forEach((element:any,i:any)  => {
            if(data['id_branch']  == element['id_branch']){
              element['status'] = true
            }else{
              element['status'] = false
            }
          });
        }else{
          this.month_wise = true
          this.branch.splice(0, 1)
          this.temp_branch = this.branch.slice();
          if(data['id_branch'][0] == 0){
            this.temp_branch.forEach((element:any,i:any)  => {
              element['status'] = true
            });
          }else {
            this.temp_branch.forEach((element:any,i:any)  => {
              data['id_branch'].forEach((data1:any,i:any)  => {
                if(data1  == element['id_branch']){
                  element['status'] = true
                }
              });
            });
          }

        }

        this.sebranch = res
        console.log(this.branch,'branch data');
      });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BranchPage');
  }
  dismiss(){
    return this.modalCtrl.dismiss(null, 'cancel');

  }
  selected(){
    if(this.month_wise){
      this.temp_branch.forEach((element:any,i:any)  => {
        if( element['status'] === true){
          this.select_branch['branch'].push(element)
        }
      });
    }else if(!this.month_wise){
      this.branch.forEach((element:any,i:any)  => {
        if( element['status'] === true){
          this.select_branch['branch'].push(element)
        }
      });
    }
 if(this.fin['temp'] != 23){
  this.types.forEach((element:any,i:any)  => {
    if( element['status'] === true){

      this.select_branch['metal'].push(element)
    }
  });
 }else if(this.fin['temp'] == 23){
  this.fin_metal.forEach((element:any,i:any)  => {
    if( element['status'] === true){

      this.select_branch['metal'].push(element)
    }
  });
 }

    // console.log(this.select_metal,'k');
    // this.select_branch['metal'] = this.select_metal
    console.log(this.select_branch,'select data');
    if(this.select_branch['branch'].length != 0){
      return this.modalCtrl.dismiss(this.select_branch, 'confirm');
    }else{
      this.common.presentToast('please select the Branch');
      return 0
    }
  }
  getCus(input:any){

    console.log(input.target.value);
    console.log(this.sebranch)
    console.log(this.types1);

    console.log(this.branch_show);

if(this.branch_show){
  this.branch = this.sebranch.filter(item => item['name'].toUpperCase().includes(input.target.value.toUpperCase()));
}else if(!this.branch_show && this.fin['temp'] != 23){
  this.types = this.types1.filter(item => item['metal'].toUpperCase().includes(input.target.value.toUpperCase()));
}else if(!this.branch_show && this.fin['temp'] == 23){
  this.fin_metal = this.fin_metal1.filter((item:any) => item['name'].toUpperCase().includes(input.target.value.toUpperCase()));

}


  }
  // ionViewWillLeave(){
	// 	this.events.publish( 'entered', false );

	//   }
  ionViewWillEnter(){
    this.get_coverupreport()
  }

  async ngOnInit() {
  await this.storage.create();

  }
  selectedItemIndex: number = -1;

  getitems(item:any,idx:any){
    console.log('kkkkk',item,idx);
      this.branch.forEach((element:any,i:any)  => {
        if( element['id_branch'] === item['id_branch']){
          element['status'] = true
        }else{
          element['status'] = false
        }
      });

    }

    get1(item:any,idx:any){
      console.log('kkkkk',item,idx)
      console.log(item,'h')
      this.fin_metal.forEach((element:any,i:any)  => {
        if( element['id_metal'] === item['id_metal']){
          element['status'] = true
        }else{
          element['status'] = false
        }
      });
          // this.select_branch['metal'].push(item)
    }

    // this.cd.detectChanges();
    // this.items = this.all.filter(item=>item['id']==i['id']);


  getitems1(i:any,idx:any){
    console.log('kkkkk',i,idx);
    if(i == 'Branch'){
      this.branch_show = true
      this.metal_show = false
      this.ind1 = idx
    }else if(i == 'Metal'){
      this.branch_show = false
      this.metal_show = true
      this.ind1 = idx
    }

    // this.cd.detectChanges();
    // this.items = this.all.filter(item=>item['id']==i['id']);
  }

  handleCheckboxChange(event: any, currentIndex: number) {
    // Uncheck all other checkboxes except the one at currentIndex
    this.types.forEach((item:any, index:any) => {
      if (index !== currentIndex) {
        item['status'] = false;
      }
    });

    // Call your getitems function here if needed
    this.getitems(event, currentIndex);
  }


  // Initialize to -1 as none selected initially

  clear(){
    this.common.getmetal().subscribe(async res =>{
      this.types = res['response_data']
      this.types1 = res['response_data']
      this.types.forEach((element:any,i:any)  => {
        element['status'] = false
      });
      console.log(this.types,'metal data');
    });

    this.common.getbranch().subscribe(async res =>{
      this.branch = res
      this.branch.forEach((element:any,i:any)  => {
        element['status'] = false
      });
      this.temp_branch.forEach((element:any,i:any)  => {
        element['status'] = false
      });
      this.sebranch = res
      console.log(this.branch,'branch data');
    });

    this.common.metal().subscribe(async res =>{
      this.fin_metal = res['responsedata']
      this.fin_metal1 = res['responsedata']
      this.fin_metal.forEach((element:any,i:any)  => {
        element['status'] = false
      });
      console.log(this.fin_metal,'metal data');
    });


  }




  onCheckboxChange(data:any,idx:any){
    console.log(data,idx,'k')
    // this.types[idx]['status']= data
  }



}
