import { Component } from '@angular/core';
import { ionicBootstrap, Platform, SqlStorage, Storage , ModalController} from 'ionic-angular';
import { StatusBar , SQLite} from 'ionic-native';
import {TabsPage} from "./pages/tabs/tabs";
// import {NativePageTransitions, TransitionOptions} from 'ionic-native';
import * as CONFIGS from "../myConfig";
import {SqlStorageService} from "./providers/sqlstorage";
import {SignUpPage} from "./pages/home/signup/signup";

declare var firebase;

@Component({
  providers: [SqlStorageService],
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = TabsPage;
  profile;

  constructor(public platform: Platform, private modalCtrl: ModalController) {
    platform.ready().then(() => {
      console.log(CONFIGS);

      console.log(document.getElementsByClassName("homemain-page"));
      this.profile = document.getElementsByClassName("homemain-page");

      var config = {
        apiKey: CONFIGS.data.apiKey,
        authDomain: CONFIGS.data.authDomain,
        databaseURL: CONFIGS.data.databaseURL,
        storageBucket: CONFIGS.data.storageBucket,
        messagingSenderId: CONFIGS.data.messagingSenderId
      };
      firebase.initializeApp(config);

      console.log(platform.platforms());
      let myPlat = platform.platforms();
      if(myPlat[0] === 'cordova'){




        console.log("You are deploying the app on an Iphone");
        let db = new SQLite();
        let modal = this.modalCtrl.create(SignUpPage);
        modal.onDidDismiss(() => {
          this.BackgroundOpacity(true);
        });
        this.BackgroundOpacity(false);
        modal.present();
        db.openDatabase({
          name: 'data.db',
          location: 'default'
        }).then((data) => {
          console.log(data);

          //CREATE FOOD TABLE
          db.executeSql('CREATE TABLE IF NOT EXISTS food_table (id INTEGER PRIMARY KEY AUTOINCREMENT, saved_food text, scanned_food text, barcode_id text, food_notes text, name_of_creator text, profile_pic text, scanned_date text, food_order text, food_title text)', [])
            .then((data) => {
              console.log("Table has been created : food_table");
              console.log(JSON.stringify(data));
            }, (error) => {
              console.error("Unable to open database");
              console.log(JSON.stringify(error));
            });

          //CREATE DRAFT TABLE
          db.executeSql('CREATE TABLE IF NOT EXISTS draft_table (id INTEGER PRIMARY KEY AUTOINCREMENT, food_order text)', [])
            .then((data) => {
              console.log("Table has been created : draft_table");
              console.log(JSON.stringify(data));
            }, (error) => {
              console.error("Unable to open database");
              console.log(JSON.stringify(error));
            });


          //CREATE PROFILE TABLE
          db.executeSql('CREATE TABLE IF NOT EXISTS profile_table (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, profile_pic text)', [])
            .then((data) => {
              console.log("Table has been created : profile_table");
              console.log(JSON.stringify(data));
            }, (error) => {
              console.error("Unable to open database");
              console.log(JSON.stringify(error));
            });



        });





      }else{






        console.log("You are running your device on a Web Application");
        let storage = new Storage(SqlStorage);

        //CREATE THE FOOD TABLE
        storage.query('CREATE TABLE IF NOT EXISTS food_table (id INTEGER PRIMARY KEY AUTOINCREMENT, saved_food text, scanned_food text, barcode_id text, food_notes text, name_of_creator text, profile_pic text, scanned_date text, food_order text, food_title text)').then(
          result => {
            console.log(result);
            console.log("Created Table food_table Successfully");
          }, err => {
            console.log("Failed Making Table food_table");
            console.log(err);
          }
        );

        //CREATE THE DRAFT TABLE
        storage.query('CREATE TABLE IF NOT EXISTS draft_table (id INTEGER PRIMARY KEY AUTOINCREMENT, food_order text)').then(
          result => {
            console.log(result);
            console.log("Created Table draft_table Successfully");
          }, err => {
            console.log("Failed Making Table draft_table");
            console.log(err);
          }
        );

        //CREATE THE PROFILE TABLE
        storage.query('CREATE TABLE IF NOT EXISTS profile_table (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, profile_pic text)').then(
          result => {
            console.log(result);
            console.log("Created Table profile_table Successfully");
            if(result.res.rows.length === 0){
              console.log("User does not have an account with us");
              let modal = this.modalCtrl.create(SignUpPage);
              modal.onDidDismiss(() => {
                this.BackgroundOpacity(true);
              });
              this.BackgroundOpacity(false);
              modal.present();
            }

          }, err => {
            console.log("Failed Making Table profile_table");
            console.log(err);
          }
        );

      }





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
