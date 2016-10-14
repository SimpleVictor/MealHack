import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SqlStorageService} from "../../providers/sqlstorage";

declare var TweenLite;
declare var Circ;
@Component({
  templateUrl: 'build/pages/setting/setting.html',
})
export class Setting {

  constructor(public navCtrl: NavController, private sqlstorage: SqlStorageService) {}

  ionViewDidEnter(){
    let obj = document.getElementById("setting-title");
    TweenLite.from(obj, 0.4, {width:"0px",opacity: 0, ease:Circ.easeOut});
    let cards = document.getElementsByClassName("setting-card");
    TweenLite.from(cards, 0.2, {margin:"100px",ease:Circ.easeOut});
  }

  deleteTable(){
    this.sqlstorage.DeleteTable().then(
      (data) => {
        console.log("Deleted Table Sucessfully");
      }, (err) => {
        console.log("Failed to delete table");
        console.log(err);
      }
    );
  }

}
