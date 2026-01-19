
import { LoadingController, Platform, ToastController, MenuController } from '@ionic/angular';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
//import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Common1Service } from 'src/service/common1.service';
// import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Storage } from "@ionic/storage";
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
//import { Storage } from '@ionic/storage-angular';
// import { Events } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],

  animations: [
    trigger('myvisibility', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0
      })),
      transition('* => *', animate('.5s'))
    ])
  ]


})
export class LoginPage {

  visibleState = 'visible';
  public loginForm: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;
  public remember2: AbstractControl;
  public id_branch: AbstractControl;

  public submitted: boolean = false;
  isDisabled: boolean = false;
  getuserLoginURL: string = '';
  errorMessage: string = '';
  public typecheck = 'password';
  public showPass = false;
  remember: any = false;
  currency: any = '';
  // id_branch: any = [];
  branch_name: any = '';

  type: any = 'password';
  text: any;
  facebook: any;
  user: any = { username: '' };
  emailChanged: boolean = false;
  submitAttempt: boolean = false;
  animateClass = { 'zoom-in': true };

  branch_settings: any;
  login_branch: any;
  branches: any = [];
  class = "margin";
  cmpName = "";
  deviceid: any = '';
  default_login: boolean = false

  login: any = { username: "", password: "" };

  maintain_ver: any;


  async ngOnInit() {

    await this.storage.create();

  }
  constructor(private menu: MenuController, private builder: FormBuilder, private common: Common1Service, public toast: ToastController, private platform: Platform, public load: LoadingController, private storage: Storage, public router: Router) {
    this.common.menu_option = false
    this.getDeviceId();

    this.loginForm = builder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)])],
      password: ['', Validators.compose([Validators.required])],
      id_branch: ['', Validators.required],
      remember2: [false, ''],
      device: this.deviceid['identifier'],
      status: 1
    });
    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
    this.id_branch = this.loginForm.controls['id_branch'];
    this.remember2 = this.loginForm.controls['remember2'];

    //  if(this.default_login == false){
    this.common.showLoader().then(() => {

      this.common.getCusAppVersion().subscribe(async res => {
        this.branch_settings = res['settings']['branch_settings'];
        this.login_branch = res['settings']['login_branch'];
        this.maintain_ver = res['maintain_ver'];
        console.log(this.branch_settings);
        console.log(this.login_branch);
        this.storage.set('versionData', res)
        console.log(res);
        console.log('remem : ', await this.storage.get('versionData'));

        if (this.branch_settings == 1 && this.login_branch == 1) {
          this.common.getbranch().subscribe(async data => {
            if (data) {
              data.forEach((element: any, idx: any) => {
                if(element['is_default'] == 1){
                  this.branches.push(element);
                }
              })
            }
            this.loginForm.controls["id_branch"].setValue(this.branches[0]['id_branch'])
            let remember = await this.storage.get(('remember2'));
            console.log(remember)
            this.get_login()
            if (JSON.parse(remember)['remember2'] == true) {

              console.log('trueeeee : ');

              // this.remember2 = true;
              this.loginForm.controls["remember2"].setValue(true);
              this.loginForm.controls["username"].setValue(this.storage.get(JSON.parse('remember2value')['username']));
              this.loginForm.controls["password"].setValue(this.storage.get(JSON.parse('remember2value')['password']));
              this.loginForm.controls["id_branch"].setValue(this.storage.get(JSON.parse('remember2value')['id_branch']));
            }

          })
        } else {
          let remember = this.storage.get(JSON.parse(('remember2')));
          console.log(remember)

          if (this.remember == true) {
            // this.remember2 = true;
            this.loginForm.controls["remember2"].setValue(true);
            this.loginForm.controls["username"].setValue(this.storage.get(JSON.parse('remember2value')['username']));
            this.loginForm.controls["password"].setValue(this.storage.get(JSON.parse('remember2value')['password']));
            this.loginForm.controls["id_branch"].setValue(this.login_branch);
          }

        }

      })

      this.common.stopLoader();

    })
    //  }

  }

  ionViewDidEnter() {
    this.menu.enable(false);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise
    // the rest of the pages won't be able to swipe to open menu
    this.menu.enable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
  }

  async getDeviceId() {
    // this.get_login()
    try {
      const info = await Device.getId();
      // const deviceId = info;
      this.deviceid = info
      console.log('Device ID:', this.deviceid['identifier']);
      return this.deviceid;
    } catch (error) {
      console.error('Error retrieving device ID:', error);
      return null;
    }

  }

  async get_login() {
    // let remember = await this.storage.get(('remember2'))
    // console.log(remember, 'p');
    // // this.loginForm.controls["remember2"].setValue(true);
    // // this.loginForm.controls["username"].setValue(JSON.parse('remember')['username']);
    // // this.loginForm.controls["password"].setValue(JSON.parse('remember')['password']);
    // // this.loginForm.controls["id_branch"].setValue(JSON.parse('remember')['id_branch']);
    // console.log(JSON.parse(remember)['remember2'], 'p');
    // if (JSON.parse(remember)['remember2'] === true) {
    //   this.default_login = true
    //   this.router.navigate(['/home'])
    // }
  }

  updateremember2(value: any) {
    this.loginForm.controls["remember2"].setValue(value);
    console.log(value);
  }
  changeType() {
    this.type = !this.type;
  }

  get_set(data: any) {
    this.storage.set('remember2value', JSON.stringify(data))
  }

  public async onSubmit(values: any): Promise<void> {
    //  values['device'] = '1111111';
    values['device'] = this.deviceid['identifier'];
    values['app_type'] = 2
    console.log(values, 'value');


    // values['model'] =  this.device.model;
    // values['manufacturer'] =  this.device.manufacturer;

    var hasBranch = (this.branch_settings == 1 && this.login_branch == 1) ? true : false;
    this.submitted = true;
    if (hasBranch == false) {
      // Remove validation for Branch (No branch required for login)

    }
    if (this.loginForm.valid) {

      this.errorMessage = 'Logging in...';
      this.isDisabled = true;
      this.common.showLoader();
      this.common.doLogin(JSON.stringify(values)).subscribe(async (res: any) => {
        if (res) {
          if (res.result) {
            // this.storage.set('remember',JSON.stringify(this.remember))
            if (res.type == "logged") { // Employee Logged In
              // console.log(JSON.stringify(this.remember));
              console.log(values)
              this.storage.set('loginvalue', JSON.stringify(values))
              this.storage.set('remember', JSON.stringify(this.remember))
              this.storage.set('remember2', JSON.stringify(this.loginForm.value))
              await this.storage.set('remember2value', JSON.stringify(values))
              this.storage.set('userdet', JSON.stringify(values)) // Login details
              res.empdata['id_branch'] = JSON.parse(await this.storage.get('remember2value'))['id_branch']
              let bname: any[] = this.branches.filter((element: any) => {
                //  if(element){
                return element.id_branch === res.empdata['id_branch']
                //  }
              });
              res.empdata['branch_name'] = bname.length > 0 ? bname[0]['name'] : res.empdata['branch_name'];
              console.log(res.empdata);
              await this.storage.set('empDetail', JSON.stringify(res.empdata)); // Employee Details
              localStorage.setItem('empDet', JSON.stringify(res.empdata)); // Employee Details
              localStorage.setItem('logstatus', JSON.stringify(true));
              // this.loginn()
              // this.event.publish('user:changed', true);
              // this.router.navigateByUrl("/app/home");
              this.router.navigate(['/home'])
            }
          } else {
            this.errorMessage = res.msg;
            this.common.presentToast(res.msg);
            this.isDisabled = false;
          }
          this.common.stopLoader();
        }
      }, (error: any) => {
        this.isDisabled = false;
        this.common.stopLoader();
      });
    }
    else { // Invalid Form Submit
      if (!this.loginForm.get('username')?.valid) {
        let ctrl = await this.toast.create({
          message: 'Please Enter Username Minimum 5 & Maximum 15 letters',
          // duration: this.common.toastTimeout,
          position: 'bottom'
        });
        ctrl.present();
      }
      else {
        if (!this.loginForm.get('password')?.valid) {
          let ctrl = await this.toast.create({
            message: 'Please Enter Password Minimum 8 & Maximum 16 letters',
            // duration: this.common.toastTimeout,
            position: 'bottom'
          });
          ctrl.present();

        }
      }
    }
  }


  // async loginn() {
  //   // Perform login logic
  //   await this.storage.set('loggedIn', true);
  // }

  // async logout() {
  //   // Perform logout logic
  //   await this.storage.set('loggedIn', false);
  // }

  // async isLoggedIn(): Promise<boolean> {
  //   const loggedIn = await this.storage.get('loggedIn');
  //   return !!loggedIn;
  // }

}


