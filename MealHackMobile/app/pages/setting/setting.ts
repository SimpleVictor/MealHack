import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var TweenLite;
declare var Bounce;
@Component({
  templateUrl: 'build/pages/setting/setting.html',
})
export class Setting {

  constructor(public navCtrl: NavController) {}

  ionViewDidEnter(){
    let obj = document.getElementById("setting-title");
    TweenLite.from(obj, 0.5, {left:"300px", ease:Bounce.easeOut});
  }

}
