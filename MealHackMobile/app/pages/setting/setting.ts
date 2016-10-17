import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {SqlStorageService} from "../../providers/sqlstorage";
import { BarcodeScanner } from 'ionic-native';
import {BarcodeData} from "../home/home";

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

  ScanBarCode(){
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
    this.sqlstorage.InsertScannedData(details.text).then(
      (data) => {
        console.log("Sucessfully added data");
        this.navCtrl.parent.select(1);
      }, (err) => {
        console.log("FAILED ADDING DATA");
        console.log(err);
      }
    );
    // this.navCtrl.push(IndividualBarcode, {id: details.text, is_scan: true});
  }


}
