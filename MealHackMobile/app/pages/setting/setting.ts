import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {SqlStorageService} from "../../providers/sqlstorage";

declare var qrcode;

declare var TweenLite;
declare var Circ;
@Component({
  templateUrl: 'build/pages/setting/setting.html',
})
export class Setting {

  constructor(public navCtrl: NavController, public sqlstorage: SqlStorageService, private alertCtrl: AlertController) {

  }

  ionViewDidEnter(){


    let obj = document.getElementById("setting-title");
    TweenLite.from(obj, 0.4, {width:"0px",opacity: 0, ease:Circ.easeOut});
    let cards = document.getElementsByClassName("setting-card");
    TweenLite.from(cards, 0.2, {margin:"100px",ease:Circ.easeOut});


    // let alert = this.alertCtrl.create({
    //   title: 'Sorry',
    //   subTitle: 'Nothing on this page works by the way. App still in the beta!',
    //   buttons: ['=( okay.']
    // });
    // alert.present();


  }

  deleteTable(){
    this.sqlstorage.DeleteAllTable().then(
      (data) => {
        console.log("Deleted Table Sucessfully");
      }, (err) => {
        console.log("Failed to delete table");
        console.log(err);
      }
    );
  }

  addSampleData(){
    this.sqlstorage.AddFakeData().then(
      (data) => {
        console.log("Added Fake Data Sucess!");
      }, (err) => {
        console.log("Failed to add fake DATA!");
        console.log(err);
      }
    )
  }


  getAllTableData(){
    this.sqlstorage.RetreiveAllTable((result) => console.log(result));
  }

  addSampleDraftData(){
    this.sqlstorage.AddFakeDraftItems().then(
      (data) => console.log("SUCESS!"),
      (err) => console.log(err)
    );
  }

}
