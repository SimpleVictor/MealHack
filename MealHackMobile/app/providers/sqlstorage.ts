import { Injectable } from '@angular/core';
import {Platform, SqlStorage, Storage} from "ionic-angular";
import {SQLite} from "ionic-native";


@Injectable()
export class SqlStorageService {

  isMobile;
  iosDB;
  webDB;

  constructor(private platform: Platform) {
    let whichPlat = platform.platforms;
    if(whichPlat[0] === 'cordova'){
      console.log("your on the iphone");
      this.isMobile = true;
      this.iosDB = new SQLite();
    }else{
      console.log("your on the web");
      this.webDB = new Storage(SqlStorage);
    }
  }

  DeleteTable(){
    if(this.isMobile){
      return this.iosDB.executeSql(`DROP TABLE IF EXISTS current_user`, {});
    }else{
      return this.webDB.query(`DROP TABLE IF EXISTS current_user`);
    }
  }



}
