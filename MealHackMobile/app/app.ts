import { Component } from '@angular/core';
import { ionicBootstrap, Platform, SqlStorage, Storage } from 'ionic-angular';
import { StatusBar , SQLite} from 'ionic-native';
import {TabsPage} from "./pages/tabs/tabs";
// import {NativePageTransitions, TransitionOptions} from 'ionic-native';
import * as CONFIGS from "../myConfig";
import {SqlStorageService} from "./providers/sqlstorage";

declare var firebase;

@Component({
  providers: [SqlStorageService],
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(public platform: Platform) {
    platform.ready().then(() => {
      console.log(CONFIGS);


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
        db.openDatabase({
          name: 'data.db',
          location: 'default'
        }).then(() => {
          db.executeSql("CREATE TABLE IF NOT EXISTS current_user (id INTEGER PRIMARY KEY AUTOINCREMENT, name text)", [])
            .then((data) => {
              console.log("Table has been created : "+JSON.stringify(data));
            }, (error) => {
              console.error("Unable to open database", error);
            });
        });
      }else{
        console.log("You are running your device on a Web Application");
        let storage = new Storage(SqlStorage);
        storage.query('CREATE TABLE IF NOT EXISTS current_user (id INTEGER PRIMARY KEY AUTOINCREMENT, name text)').then(
          result => {
            console.log(result);
            console.log("Created Table Successfully");
          }, err => {
            console.log("Failed Making Table BOoo");
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
}

ionicBootstrap(MyApp,[],{
  iconMode: "md"
});
