
import { Component, OnInit } from '@angular/core';
import { Common1Service } from 'src/service/common1.service';
import { Storage } from '@ionic/storage-angular';
import { Device } from '@capacitor/device';
import { AlertController, LoadingController, MenuController, NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import OneSignal from 'onesignal-cordova-plugin';



declare var window:any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})




export class AppComponent implements OnInit {
  appPages:any =[]
  pages: any;
  menu_hide:any
 loading:any
 login_type:any
 empdata:any
 remember: any = false;
 currency: any = '';
 // id_branch: any = [];
 branch_name: any = '';
 branches : any = [];
 isDisabled: boolean = false;
 getuserLoginURL: string = '';
 errorMessage: string = '';
 maintain_ver:any;
 notid:any


  constructor(public navCtrl: NavController,private loadingController: LoadingController,public alertCtrl: AlertController,private loadingCtrl: LoadingController,public menuCtrl: MenuController,public common:Common1Service,private storage: Storage,public platform: Platform,public router: Router) {

    this.menu_hide = false
    this.storage.create();
    this.getDeviceId();
    this.get_branch();
    this.get_login()
    platform.ready().then(() => {
      console.log('platform ready : ');
      console.log('onesignal inint : ');

      // Remove this method to stop OneSignal Debugging
      OneSignal.Debug.setLogLevel(6)

      // Replace YOUR_ONESIGNAL_APP_ID with your OneSignal App ID
      // OneSignal.initialize("e98f70d8-0e34-4d38-bcc6-a4a595f5b5f1");
      // OneSignal.initialize("8ec21fb9-8a3c-4963-a539-834cd51365c4");
      OneSignal.initialize("");



      OneSignal.Notifications.addEventListener('click', async (e: any) => {
        let clickData = await e.notification;
        // let id: any = clickData.notification.additionalData.hasOwnProperty('apprl_type') ? clickData.notification.additionalData['apprl_type'] : {};
        //   // that.notiid = id
        //   console.log('noti_service', id)
          let not = JSON.stringify(clickData)
          const notificationData = JSON.parse(not);
          console.log(notificationData,"Notification Clicked : " );
          const additionalData = notificationData.additionalData;
          console.log(additionalData," Clicked : " );
          // Access specific properties from additionalData
          const apprlType = additionalData.hasOwnProperty('apprl_type') ? additionalData['apprl_type'] : null;

          console.log('Approval Type:', apprlType);
          this.login_type = apprlType;
        //  this.router.navigate(['/bill-approve'])

       if(apprlType != undefined && apprlType != ''){
            // await this.storage.set('appovertype',apprlType)
            this.login_type = JSON.stringify(apprlType)
            console.log(this.login_type);

            this.router.navigate(['/bill-approve'])

          }
      })

      OneSignal.Notifications.requestPermission(true).then((success: any) => {
        console.log("Notification permission granted " + success);
      })
    });

    this.common.getCusAppVersion().subscribe( async res => {
      this.maintain_ver = res['maintain_ver'];
    })
    // this.initializeApp();
  }




  // initializeApp() {
  //   document.addEventListener('deviceready', () => {
  //     window.plugins.OneSignal.startInit("047e8955-39c0-431c-a075-61b5d2cca8af", "847843625808")
  //       .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
  //       .handleNotificationOpened(() => {
  //         // Handle notification opened event
  //         console.log('Handle notification opened event');

  //       })
  //       .endInit();
  //   }, false);
  // }

  public alertButtons = [
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
        console.log('Alert confirmed');
      this.router.navigate(['/login'])

      },
    },
  ];
   async getDeviceId() {
    try {
      const info = await Device.getId();
      const deviceId = info;
      console.log('Device ID:', deviceId);
      return deviceId;
    } catch (error) {
      console.error('Error retrieving device ID:', error);
      return null;
    }
  }




  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
    // let empdata = JSON.parse(await this.storage.get('empDetail'));
    // if(empdata != null && empdata != undefined){
    //   this.pages = empdata.menus;
    //   console.log(this.pages);
    // }


  }



  async get_branch(){
    this.common.getbranch().subscribe(async res =>{
    console.log(res,'branch');
    this.menu_hide = this.common.menu_option
    let empdata = JSON.parse(await this.storage.get('empDetail'))
    console.log(empdata,'empdata');
    if(empdata != null && empdata != undefined){
      this.pages = empdata.menus;
      console.log(this.pages);
    }
    });

  }

  default_login:any
  async get_login() {
    let remember = await this.storage.get(('remember2'))
    console.log(remember, 'p');
    // this.loginForm.controls["remember2"].setValue(true);
    // this.loginForm.controls["username"].setValue(JSON.parse('remember')['username']);
    // this.loginForm.controls["password"].setValue(JSON.parse('remember')['password']);
    // this.loginForm.controls["id_branch"].setValue(JSON.parse('remember')['id_branch']);
    console.log(JSON.parse(remember)['remember2'], 'p');
    if (JSON.parse(remember)['remember2'] === true) {
      this.default_login = true
      this.router.navigate(['/home'])
    }
  }

  openpage(pageName:any){
    console.log(pageName,'page');
   if(pageName == 'Home'){
      this.router.navigate(['/home'])
    }
    else if(pageName == 'Sign Out'){
      this.presentAlert()
    }
    else if(pageName == 'Approval'){
      let data = undefined
      this.common.setData(data);
     this.router.navigate(['/bill-approve'])
  }
  else if(pageName == 'Reports'){
    // let data = undefined
    // this.common.setData(data);
   this.router.navigate(['/reporthistory'])
}
  }

  async presentAlert() {
    await this.alertCtrl.create({
      header: 'Confirm Logout',
      subHeader: 'Are you sure you want to logout!',
      buttons:  [
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
          handler: async () => {
            console.log('Alert confirmed');
            this.loading = await this.loadingController.create({
              message: 'Loading...',
              // duration: 3000,
              spinner: 'circles'
            });
            await this.loading.present();
            (await this.common.logout()).subscribe(async res =>{
                await this.storage.clear();
              this.loading.dismiss();
            },(err: any)=>{
              this.loading.dismiss();

            })
          this.storage.clear();
          this.router.navigate(['/login'])

          }
        },
      ]
      // Additional configuration as needed
    }).then(alert => alert.present()
    );

  }

  setResult(event: any) {
    console.log('Alert didDismiss with event:', event);
  }

  // openPage(pageData) {
	// 	console.log(pageData)
	// 	var pageName = pageData.component;
	// 	console.log(pageName);
	// 	this.clickedMenu = pageData.id;
	// 	this.menu.close();
	// 	if(pageName == 'LoginPage'){
	// 		this.nav.push(LoginPage);
	// 	}
	// 	else if(pageName == 'HomePage'){
	// 		this.nav.setRoot(HomePage);
	// 	}
	// 	else if(pageName == 'EstiPage'){
	// 		this.nav.push(EstiPage,{"page_type" : pageData.page});
	// 	}
	// 	else if(pageName == 'CusRegisterPage'){
	// 		this.nav.push(CusRegisterPage);
	// 	}
	// 	else if(pageName == 'CategoryPage'){
	// 		this.nav.push(CategoryPage,{'pagename':pageName == 'LiveStock' ? 'instock' : 'outofstock'});
	// 	}
	// 	else if(pageName == 'SupplierCategoryPage'){
	// 		this.nav.setRoot(SupcatPage,{'pagename':pageName == 'LiveStock' ? 'instock' : 'outofstock'});
	// 	}
	// 	else if(pageName == 'Ecatalog'){
	// 		this.nav.setRoot(EcatalogPage);
	// 	}
	// 	else if(pageName == 'CollectionPage'){
	// 		this.nav.push(CollectionPage,{'filter':{
	// 		// 	"Category": [
	// 		// 	{

	// 		// 	  "category_code": '0',
	// 		// 	}
	// 		//   ]
	// 		"is_newArrival" : 1,
  //   "Stock Status": [
  //   {
  //     "name": "Open",
  //     "count": "-1",
  //     "status": true
  //   }
  //   ]

	// 		},'collect':'tt'});
	// 	}
	// 	else if(pageName == 'EdittagPage'){
	// 		this.nav.push(Edittag2Page);
	// 	}
	// 	else if(pageName == "WishlistPage"){
	// 		this.nav.setRoot(WishlistPage);
	// 	}
	// 	else if(pageName == "CartPage"){
	// 		this.nav.push(CartPage);
	// 	}
	// 	else if(pageName == "FaqPage"){
	// 		this.nav.push(FaqPage);
	// 	}
	// 	else if(pageName == "StockCodeEntryPage"){
	// 		this.nav.setRoot(StockCodeEntryPage);
	// 	}
	// 	else if(pageName == 'EstimationlistPage'){
	// 		this.nav.push(EstimationlistPage);
	// 	}
	// 	else if(pageName == 'SubdesignPage'){
	// 		this.nav.push(SubdesignlistPage);
	// 	}
	// 	else if(pageName == 'CustomorderPage'){
	// 		this.nav.setRoot(CustomorderPage);
	// 	}
	// 	else if(pageName == 'DesignlistPage'){
	// 		this.nav.push(DesignlistPage);
	// 	}
	// 	else if(pageName == 'logout'){
	// 		let confirm = this.alertCtrl.create({
	// 			title: 'Confirm Logout',
	// 			subTitle: 'Are you sure you want to logout!',
	// 			buttons: [
	// 				{
	// 					text: 'Cancel',
	// 					handler: () => {
	// 						console.log('Disagree clicked');
	// 					}
	// 				}, {
	// 					text: 'Ok',
	// 					handler: () => {

	// 						let loader = this.loadingCtrl.create( {
	// 							content: 'Please Wait',
	// 							spinner: 'bubbles',
	// 						} );
	// 						loader.present();

	// 						this.common.logout().then(data=>{

	// 							loader.dismiss();
	// 							localStorage.setItem('logstatus', JSON.stringify(false));
	// 						localStorage.setItem('remember', JSON.stringify(false));
	// 						localStorage.setItem('remember2', JSON.stringify(false));

	// 						this.loginstatus = false;
	// 						this.events.publish('user:changed', false);
	// 						//this.nav.setRoot(HomePage, { st: false });
	// 						this.nav.push( LoginPage );

	// 						},err=>{
	// 							loader.dismiss();

	// 						})

	// 					}
	// 				}
	// 			]
	// 		});
	// 		confirm.present();
	// 	}
	// }



}
