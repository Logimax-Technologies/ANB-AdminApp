import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { Common1Service } from 'src/service/common1.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent  implements OnInit {


  receivedData:any
  loading:any
  cus_detail:any
  bill_detail:any [] =[]
  list: any[] = new Array(5);
  condition:any
  cus_detail1:any

  constructor(private modalCtrl: ModalController,public common:Common1Service,private navParams: NavParams,private loadingController: LoadingController) {
   this.get_customer()
   }

  ngOnInit() {}


  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async get_customer(){
    this.loading = await this.loadingController.create({
      message: 'Loading...',
      // duration: 3000,
      spinner: 'circles'
    });
    await this.loading.present();
    this.receivedData = this.navParams.get('data');
    console.log(this.receivedData,'data');
    let cus_id = this.receivedData['id_customer']

    console.log('Received data:', this.receivedData)
    this.common.getCustomer({"id_customer" : cus_id }).subscribe(res =>{
      console.log(res,'data');
      this.cus_detail1 = res
      this.cus_detail = res['cus_details'][0]
      this.bill_detail = res['bill_details']
      console.log(this.cus_detail);
      let star:any = res['cus_review_avg']
      console.log(star,'f');

      for(let i=1;i<= star;i++ ){
        this.condition = i + 1;
      }
    console.log(this.condition,'j')


      });

    await this.loading.dismiss();

  }


}
