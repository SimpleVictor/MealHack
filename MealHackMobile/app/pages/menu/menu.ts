import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var TweenLite;
declare var Circ;
@Component({
  templateUrl: 'build/pages/menu/menu.html',
})
export class Menu {

  constructor(public navCtrl: NavController) {}

  ionViewDidEnter(){
    let obj = document.getElementById("menu-title");
    TweenLite.from(obj, 0.5, {left:"300px", ease:Circ.easeOut});
    let cards = document.getElementsByClassName("menu-card");
    TweenLite.from(cards, 0.2, {margin:"100px",ease:Circ.easeOut});
  }
}
