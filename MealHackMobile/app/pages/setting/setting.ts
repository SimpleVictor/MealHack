import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SqlStorageService} from "../../providers/sqlstorage";

declare var qrcode;

declare var TweenLite;
declare var Circ;
@Component({
  templateUrl: 'build/pages/setting/setting.html',
})
export class Setting {

  constructor(public navCtrl: NavController, public sqlstorage: SqlStorageService) {

  }

  ionViewDidEnter(){
    console.log(qrcode);
    var typeNumber = "40";
    var errorCorrectionLevel = 'H';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData('food_amount:1,food_url:img/food/burgerking/burger/whopper.png,food_name:Whopper Sandwich;food_amount:1,food_url:img/food/burgerking/burger/doublewhoppersandwich.png,food_name:Double Whopper Sandwich;food_amount:1,food_url:img/food/burgerking/burger/whopperjrsandwich.png,food_name:Whopper Jr Sandwich;food_amount:1,food_url:img/food/burgerking/burger/baconkingsandwich.png,food_name:Bacon King Sandwich;food_amount:1,food_url:img/food/burgerking/sides/hashbrowns.png,food_name:Hash Browns;food_amount:1,food_url:img/food/burgerking/sides/onionrings.png,food_name:Onion Rings;food_amount:1,food_url:img/food/burgerking/sides/chickennuggets.png,food_name:Chicken Nuggets;food_amount:1,food_url:img/food/burgerking/burger/whopper.png,food_name:Whopper Sandwich;food_amount:1,food_url:img/food/burgerking/burger/doublewhoppersandwich.png,food_name:Double Whopper Sandwich;food_amount:1,food_url:img/food/burgerking/burger/whopperjrsandwich.png,food_name:Whopper Jr Sandwich;food_amount:1,food_url:img/food/burgerking/burger/baconkingsandwich.png,food_name:Bacon King Sandwich;food_amount:1,food_url:img/food/burgerking/sides/hashbrowns.png,food_name:Hash Browns;food_amount:1,food_url:img/food/burgerking/sides/onionrings.png,food_name:Onion Rings;food_amount:1,food_url:img/food/burgerking/sides/chickennuggets.png,food_name:Chicken Nuggets;');
    // qr.addData('bruh');
    console.log(qr.getModuleCount());
    qr.make();
    document.getElementById('placeHolder').innerHTML = qr.createImgTag();
    // document.getElementById('placeHolder').innerHTML = qr.createImgTag(3, 2*3);



    let obj = document.getElementById("setting-title");
    TweenLite.from(obj, 0.4, {width:"0px",opacity: 0, ease:Circ.easeOut});
    let cards = document.getElementsByClassName("setting-card");
    TweenLite.from(cards, 0.2, {margin:"100px",ease:Circ.easeOut});
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
