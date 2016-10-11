import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var TweenLite;
declare var Bounce;
@Component({
  templateUrl: 'build/pages/menu/menu.html',
})
export class Menu {

  constructor(public navCtrl: NavController) {}

  ionViewDidEnter(){
    let obj = document.getElementById("menu-title");
    TweenLite.from(obj, 0.5, {left:"300px", ease:Bounce.easeOut});
  }
}
