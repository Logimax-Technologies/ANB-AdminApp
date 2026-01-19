import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams, Platform } from '@ionic/angular';
import { Common1Service } from 'src/service/common1.service';
import { Capacitor } from '@capacitor/core';
import {  Directory, Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/filesystem';
import { Browser } from '@capacitor/browser';







@Component({
  selector: 'app-bill-show',
  templateUrl: './bill-show.component.html',
  styleUrls: ['./bill-show.component.scss'],
})
export class BillShowComponent  {

  name:any;
  receivedData: any
  loading:any
  bill_list:any=[]
  bt_approve = false
  title:any



  constructor(public platform: Platform,private modalCtrl: ModalController,private navParams: NavParams,private loadingController: LoadingController,public common:Common1Service) {
   this.getApprovetype_detail()
  }

  async getApprovetype_detail(){
    this.loading = await this.loadingController.create({
      message: 'Loading...',
      // duration: 3000,
      spinner: 'circles'
    });
    await this.loading.present();
    this.receivedData = this.navParams.get('data');
    this.title = this.receivedData['approve_title']
    if(this.receivedData['approve_type'] === '1'){
      let print={
        "approval_id" : this.receivedData['approval_id'],
        "estids" :this.receivedData['estids'],
        "apprl_type" : this.receivedData['approve_type'],
      }
      this.common.get_bill_print(print).subscribe(async data=>{
        console.log(data,'Response data');
        this.bill_list = data['est_id']
          });
    }else if(this.receivedData['approve_type'] === '2'){
      let print={
        "approval_id" : this.receivedData['approval_id'],
        "estids" :this.receivedData['estids'],
        "apprl_type" : this.receivedData['approve_type'],
      }
      this.common.get_cr_bill_print(print).subscribe(async data=>{
        console.log(data,'Response data');
        this.bill_list = data['est_id']
          });
    }else if(this.receivedData['approve_type'] === '3'){
      let print={
        "approval_id" : this.receivedData['approval_id'],
        "bt_codes" :this.receivedData['bt_codes'],
        "apprl_type" : this.receivedData['approve_type'],
      }
      this.common.get_bt_bill_print(print).subscribe(async data=>{
        console.log(data,'Response data');
        this.bill_list = data['bt_receipt']
          });

    }





    console.log('Received data:', this.receivedData)

    // if(this.receivedData['apprl_esti_id'] != ''){
    //   this.bill_list = est_id
    //   this.bt_approve = false
    // }else{
    // this.bill_list = this.receivedData['apprl_bt_receipt']
    // this.bt_approve = true
    // }
    console.log(this.bill_list,'bill list');

    await this.loading.dismiss();

  }



  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  get_print(data:any,type:any){
    if(type ==1){
      if (data.printURL != '') {
        console.log(data.printURL);
        this.openFile(data.printURL);
      }
    }else if(type == 2){
      if (data.url != '') {
        console.log(data.url);
        this.openFile(data.url);
      }
    }
  }


  async openFile(filePath: string) {
    try {
      // Get the URI of the file
      const fileUri = await Filesystem.getUri({
        path: filePath,
        directory: Directory.Documents // Adjust the directory if needed
      });

      // Open the file using the Browser plugin
      await Browser.open({ url: filePath });
    } catch (error) {
      console.error('Error opening file:', error);
    }
  }





}
