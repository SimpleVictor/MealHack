import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as CONFIGS from "../../../myConfig";

declare var TweenLite;
declare var Bounce;
declare var Circ;

@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {

  @ViewChild("mcdonald") mcdonald;
  @ViewChild("burgerking") burgerking;
  @ViewChild("starbuck") starbuck;
  @ViewChild("kfc") kfc;
  @ViewChild("chipotle") chipotle;

  RestaurantNameOrder;

  currentRestaurant;
  originalHeight;

  constructor(public navCtrl: NavController) {
    console.log(CONFIGS.data);
  }

  ionViewDidEnter(){
    this.RestaurantNameOrder = [
      this.mcdonald,
      this.burgerking,
      this.starbuck,
      this.kfc,
      this.chipotle
    ];



      let obj = document.getElementById("home-title");
      TweenLite.from(obj, 0.4, {width:"0px",opacity: 0, ease:Circ.easeOut});

      let obj2 = document.getElementsByClassName("welcome-card");
      TweenLite.from(obj2, 0.2, {margin: "100px", opacity: 0, ease:Circ.easeOut});

  }
  pickRestaurant(target){
    console.log(this.burgerking);
    // (this.RestaurantNameOrder[target].nativeElement;
    // let cssObj = this.RestaurantNameOrder[target].nativeElement;
    //
    for(let i = 0; i < this.RestaurantNameOrder.length; i++){
      let newNum = parseInt(target);
      if(i === newNum){
        this.currentRestaurant = i;
        this.expandRestaurant(this.RestaurantNameOrder[i]);
      }else{
        TweenLite.to(this.RestaurantNameOrder[i].nativeElement, 0.5, {right: "400px", opacity: 0, ease:Circ.easeOut, onComplete:this.onComplete, onCompleteParams:[this.RestaurantNameOrder[i]]});
      }
    }
  }

  hideIt(){
    TweenLite.to(this.burgerking.nativeElement , 0.5, {right: "400px", opacity: 0, ease:Circ.easeOut,onComplete:this.onComplete,   onCompleteParams:[this.burgerking]})
  }

  goBackToStart(){
    console.log("bruh");
    TweenLite.to(this.RestaurantNameOrder[this.currentRestaurant].nativeElement, 0.5 ,{height: "auto"});
    // for(let i = 0; i < this.RestaurantNameOrder.length; i++){

    // }
    // this.burgerking.nativeElement.style.right = 0;
    // this.burgerking.nativeElement.style.opacity = 1;
    // this.burgerking.nativeElement.style.display = '';
    // TweenLite.from(this.burgerking.nativeElement , 0.5, {right: "400px", opacity: 0, ease:Circ.easeOut});
  }

  onComplete(myobj){
    console.log("completed");
    myobj.nativeElement.style.display = 'none';
  }

  expandRestaurant(obj){
    console.log(obj.nativeElement.children[3]);
    let img = obj.nativeElement.children[3];
    let text = obj.nativeElement.children[1];
    obj.nativeElement.children[0].style.display = 'none';
    obj.nativeElement.children[2].style.display = 'none';
    TweenLite.to(img, 0.5, {height:"250px", ease:Circ.easeOut});

  }

}
