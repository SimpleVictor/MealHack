import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as CONFIGS from "../../../myConfig";

declare var TweenLite;
declare var Bounce;
declare var Circ;

@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {
  constructor(public navCtrl: NavController) {
    console.log(CONFIGS.data);
  }

  ionViewDidEnter(){
      let obj = document.getElementById("home-title");
      TweenLite.from(obj, 0.4, {width:"0px",opacity: 0, ease:Circ.easeOut});

      let obj2 = document.getElementsByClassName("welcome-card");
      TweenLite.from(obj2, 0.2, {margin: "100px", opacity: 0, ease:Circ.easeOut});

  }
  testMe(){
    console.log("whjat");
  }

}
