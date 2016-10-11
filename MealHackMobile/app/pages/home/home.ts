import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var TweenLite;
declare var Bounce;
declare var Circ;

@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {
  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter(){
      let obj = document.getElementById("home-title");
      TweenLite.from(obj, 0.4, {left:"300px",opacity: 0, ease:Circ.easeOut});

      let obj2 = document.getElementById("welcome-card");
      TweenLite.from(obj2, 0.2, {margin: "100px", opacity: 0, ease:Circ.easeOut});

  }
}
