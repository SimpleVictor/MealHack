import { Component } from '@angular/core';
import { ionicBootstrap, Platform, SqlStorage, Storage , ModalController} from 'ionic-angular';
import { StatusBar , BarcodeScanner} from 'ionic-native';
import {TabsPage} from "./pages/tabs/tabs";
import * as CONFIGS from "../myConfig";
import {SqlStorageService} from "./providers/sqlstorage";
import {SignUpPage} from "./pages/home/signup/signup";

declare var firebase;
declare var cordova;

export class BarcodeData {
  constructor(
    public text: String,
    public format: String
  ) {}
}

@Component({
  providers: [SqlStorageService],
  template: `<ion-nav [root]="rootPage"></ion-nav>
<i style='font-size: 4rem;color: #FFF; right:7%;bottom:3%;background-color: #E62117; border-radius: 100%; padding: 5px 10px; position: absolute;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3); ' ion-button tappable (click)="ScanButton()" class="fa fa-qrcode fa-stack-3x"></i>`
})
export class MyApp {
  rootPage: any = TabsPage;
  profile;

  constructor(public platform: Platform, private modalCtrl: ModalController, public sqlStorage: SqlStorageService) {
    platform.ready().then(() => {
      // console.log(CONFIGS);

      // console.log(document.getElementsByClassName("homemain-page"));
      // this.profile = document.getElementsByClassName("homemain-page");

      // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);

      var config = {
        apiKey: CONFIGS.data.apiKey,
        authDomain: CONFIGS.data.authDomain,
        databaseURL: CONFIGS.data.databaseURL,
        storageBucket: CONFIGS.data.storageBucket,
        messagingSenderId: CONFIGS.data.messagingSenderId
      };
      firebase.initializeApp(config);

      // console.log(platform.platforms());
      // let myPlat = platform.platforms();


      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    //
    //   let options: TransitionOptions = {
    //     direction: 'up',
    //     duration: 500,
    //     slowdownfactor: 3,
    //     slidePixels: 20,
    //     iosdelay: 100,
    //     androiddelay: 150,
    //     winphonedelay: 250,
    //     fixedPixelsTop: 0,
    //     fixedPixelsBottom: 60
    //   };
    //
    //   NativePageTransitions.slide(options)
    //     .then((suc) => console.log(suc) )
    //     .catch((err) => console.log(err));
    //
    });
  }

  ScanButton(){
    console.log("works");
    BarcodeScanner.scan({
      "preferFrontCamera": false,
      "showFlipCameraButton" : true
    })
      .then((result) => {
        if (!result.cancelled) {
          const barcodeData = new BarcodeData(result.text, result.format);
          this.scanDetails(barcodeData);
        }
      })
      .catch((err) => {
        alert(err);
      })
  }

  scanDetails(details) {
    console.log(details.text);
    // this.navCtrl.push(IndividualBarcode, {id: details.text, is_scan: true});
  }

  BackgroundOpacity(value){
    if(value){
      this.profile[0].setAttribute("style", "background-color: '';");
    }else{
      this.profile[0].setAttribute("style", "opacity: 0.5;background-color: #363838;-webkit-filter: blur(5px);moz-filter: blur(5px);-o-filter: blur(5px);-ms-filter: blur(5px);filter: blur(5px);");
    }
  }

}

ionicBootstrap(MyApp,[],{
  iconMode: "md"
});
