import { Component} from '@angular/core';
import { NavController} from 'ionic-angular';

declare var TweenLite;
declare var Circ;

declare var $;

@Component({
  templateUrl: 'build/pages/barcode/barcode.html'
})
export class Barcode {

  pizzaIcon;

  tabIcon

  savedTop;
  savedLeft;

  constructor(public navCtrl: NavController) {}


  ionViewDidEnter(){
    this.tabIcon = document.getElementsByClassName("ion-md-restaurant");
    console.log(this.tabIcon[0].getBoundingClientRect());
    this.savedTop = this.tabIcon[0].getBoundingClientRect().top;
    this.savedLeft = this.tabIcon[0].getBoundingClientRect().left;

    this.pizzaIcon = document.getElementById("testId");
    this.pizzaIcon.style.top = `${this.savedTop}px`;
    this.pizzaIcon.style.left = `${this.savedLeft}px`;


    // console.log(tabIcon[0].offset());


    let obj = document.getElementById("barcode-title");
    TweenLite.from(obj, 0.4, {width:"0px",opacity: 0, ease:Circ.easeOut});
    let cards = document.getElementsByClassName("barcode-card");
    TweenLite.from(cards, 0.2, {margin:"100px",ease:Circ.easeOut});

  }


  tapBUtton(myevent){
    // console.log($);
    // let element = document.getElementsByClassName("ion-md-restaurant");
    // console.log(element[0].getBoundingClientRect());

    console.log(myevent.toElement.getBoundingClientRect());
    let element = myevent.toElement.getBoundingClientRect();
    let objTop = Math.round(element.top);
    let objLeft = Math.round(element.left);
    console.log(objTop, objLeft);

    TweenLite.from(this.pizzaIcon, 0.50, {top: objTop, left: objLeft , rotation: 720,ease:Circ.easeOut, onComplete: onComplete, onCompleteParams: [this.tabIcon[0]]});


    function onComplete(z){
      TweenLite.from(z, 0.50, {rotation: 720,ease:Circ.easeOut});
    }


  }

}
