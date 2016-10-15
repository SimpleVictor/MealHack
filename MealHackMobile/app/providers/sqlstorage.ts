import { Injectable } from '@angular/core';
import {Platform, SqlStorage, Storage, ModalController} from "ionic-angular";
import {SignUpPage} from "../pages/home/signup/signup";



@Injectable()
export class SqlStorageService {

  DB: Storage = null;
  profile;

  constructor(private platform: Platform, private modalCtrl: ModalController) {
      this.DB = new Storage(SqlStorage);
      let whichPlat = platform.platforms();
      console.log(whichPlat);
    this.profile = document.getElementsByClassName("homemain-page");

      //CREATE THE FOOD TABLE
      this.DB.query('CREATE TABLE IF NOT EXISTS food_table (id INTEGER PRIMARY KEY AUTOINCREMENT, saved_food text, scanned_food text, barcode_id text, food_notes text, name_of_creator text, profile_pic text, scanned_date text, food_order text, food_title text)').then(
        result => {
          console.log(result);
          console.log("Created Table food_table Successfully");
        }, err => {
          console.log("Failed Making Table food_table");
          console.log(err);
        }
      );

      //CREATE THE DRAFT TABLE
    this.DB.query('CREATE TABLE IF NOT EXISTS draft_table (id INTEGER PRIMARY KEY AUTOINCREMENT, food_order text)').then(
        result => {
          console.log(result);
          console.log("Created Table draft_table Successfully");
        }, err => {
          console.log("Failed Making Table draft_table");
          console.log(err);
        }
      );

      //CREATE THE PROFILE TABLE
    this.DB.query('CREATE TABLE IF NOT EXISTS profile_table (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, profile_pic text)').then(
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

  BackgroundOpacity(value){
    if(value){
      this.profile[0].setAttribute("style", "background-color: '';");
    }else{
      this.profile[0].setAttribute("style", "opacity: 0.5;background-color: #363838;-webkit-filter: blur(5px);moz-filter: blur(5px);-o-filter: blur(5px);-ms-filter: blur(5px);filter: blur(5px);");
    }
  }



  DeleteTable(){
      return this.DB.query(`DROP TABLE IF EXISTS profile_table`);
  }

  AddFakeData(){
      // return this.DB.query(`INSERT INTO food_table (saved_food, scanned_food, barcode_id, food_notes, name_of_creator,profile_pic, scanned_date, food_order, food_title) VALUES (?,?,?,?,?,?,?,?,?)`, ['true', 'true', '234865742', 'Put cheese on the bread', 'Victor', 'male1', '123123131','this is the stringify order', 'Monday Meal']);

    return this.DB.query(`INSERT INTO profile_table (name, profile_pic) VALUES (?,?)`, ["bob", "male2"]);

  }


  RetreiveAllTable(callback){
    let allTable = {
      food_table: {},
       profile_table: {},
      draft_table: {}
    };

      this.DB.query(`SELECT * FROM food_table`).then(
        (data) => {
          allTable.food_table = data;


          this.DB.query(`SELECT * FROM draft_table`).then(
            (data) => {
              allTable.draft_table = data;


              this.DB.query(`SELECT * FROM profile_table`).then(
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
