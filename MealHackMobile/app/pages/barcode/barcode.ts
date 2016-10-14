import { Component} from '@angular/core';
import { NavController} from 'ionic-angular';

declare var TweenLite;
declare var Circ;

declare var $;

@Component({
  templateUrl: 'build/pages/barcode/barcode.html'
})
export class Barcode {

  BarcodeTabs= "draft";

  constructor(public navCtrl: NavController) {}


  ionViewDidEnter(){

    let obj = document.getElementById("barcode-title");
    TweenLite.from(obj, 0.4, {width:"0px",opacity: 0, ease:Circ.easeOut});

    let cards = document.getElementsByClassName("barcode-card");
    TweenLite.from(cards, 0.2, {margin:"100px",ease:Circ.easeOut});

  }



}
