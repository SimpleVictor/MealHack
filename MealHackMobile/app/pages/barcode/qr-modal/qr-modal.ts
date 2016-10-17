import { Component, OnInit } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

declare var qrcode;

@Component({
    templateUrl: 'build/pages/barcode/qr-modal/qr-modal.html'
})
export class QrModal{

    qrStr;
    constructor(private navParams: NavParams, private vc: ViewController) {


      let qrObj = this.navParams.get("rawstr");
      this.qrStr = qrObj;
      // console.log(this.qrStr);


    }

  ionViewDidEnter(){

    var typeNumber = "20";
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(this.qrStr);
    qr.make();
    document.getElementById('placeHolder2').innerHTML = qr.createImgTag(3, 2*3);
  }

  DismissModal(){
    this.vc.dismiss();
  }



}
