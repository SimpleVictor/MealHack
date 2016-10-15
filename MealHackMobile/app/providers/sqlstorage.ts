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

  AddFakeData(){
    if(this.isMobile){
      return this.iosDB.executeSql(`INSERT INTO food_table (saved_food, 
                                                     scanned_food,
                                                     barcode_id,
                                                     food_notes,
                                                     name_of_creator,
                                                     profile_pic,
                                                     scanned_date,
                                                     food_order,
                                                     food_title) VALUES ('true',
                                                                         'true',
                                                                         '234865742',
                                                                         'Put cheese on the bread',
                                                                         'Victor',
                                                                         'male1',
                                                                         '123123131',
                                                                         'this is the stringify order',
                                                                         'Monday Meal')`, {});
      // this.iosDB.executeSql(``, {});
      // return this.iosDB.executeSql(``, {});
    }else{
      // this.webDB.query(``);
      // this.webDB.query(``);
      return this.webDB.query(`INSERT INTO food_table (saved_food, 
                                                     scanned_food,
                                                     barcode_id,
                                                     food_notes,
                                                     name_of_creator,
                                                     profile_pic,
                                                     scanned_date,
                                                     food_order,
                                                     food_title) VALUES ('true',
                                                                         'true',
                                                                         '234865742',
                                                                         'Put cheese on the bread',
                                                                         'Victor',
                                                                         'male1',
                                                                         '123123131',
                                                                         'this is the stringify order',
                                                                         'Monday Meal')`);
    }
  }


  RetreiveAllTable(callback){
    let allTable = {
      food_table: {},
       profile_table: {},
      draft_table: {}
    };

    if(this.isMobile){
      this.iosDB.executeSql(`SELECT * FROM food_table`, {}).then(
        (data) => {
          allTable.food_table = data;


          this.iosDB.executeSql(`SELECT * FROM draft_table`, {}).then(
            (data) => {
              allTable.draft_table = data;


              this.iosDB.executeSql(`SELECT * FROM draft_table`, {}).then(
                (data) => {
                  allTable.profile_table = data;
                  console.log("grabbed Everything successfully!");
                  callback(JSON.stringify(allTable));
                }, (err) => {
                  console.log("Failed to grab profile_table");
                  console.log(JSON.stringify(err));
                  callback(JSON.stringify(err));
                }
              );

            }, (err) => {
              console.log("Failed to grab draft_table");
              console.log(JSON.stringify(err));
              callback(JSON.stringify(err));
            }
          );

        }, (err) => {
          console.log("Failed to grab food_table");
          console.log(JSON.stringify(err));
          callback(JSON.stringify(err));
        }
      );

    }else{
      this.webDB.query(`SELECT * FROM food_table`).then(
        (data) => {
          allTable.food_table = data;


          this.webDB.query(`SELECT * FROM draft_table`).then(
            (data) => {
              allTable.draft_table = data;


              this.webDB.query(`SELECT * FROM draft_table`).then(
                (data) => {
                  allTable.profile_table = data;
                  console.log("grabbed Everything successfully!");
                  callback(allTable);
                }, (err) => {
                  console.log("Failed to grab profile_table");
                  console.log(err);
                  callback(err);
                }
              );

            }, (err) => {
              console.log("Failed to grab draft_table");
              console.log(err);
              callback(err);
            }
          );




        }, (err) => {
          console.log("Failed to grab food_table");
          console.log(err);
          callback(err);
        }
      );



    }
  }



}
