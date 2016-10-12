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
    // (this.RestaurantNameOrder[target].nativeElement;
    // let cssObj = this.RestaurantNameOrder[target].nativeElement;
    //
    for(let i = 0; i < this.RestaurantNameOrder.length; i++){
      let newNum = parseInt(target);
      if(i === newNum){
        console.log("works");
      }else{
        TweenLite.to(this.RestaurantNameOrder[i].nativeElement, 0.5, {right: "400px", opacity: 0, ease:Circ.easeOut});
      }
    }
  }

  hideIt(){
    console.log(this.burgerking);
    //Coming Back
    // TweenLite.from(this.burgerking.nativeElement , 0.5, {right: "400px", opacity: 0, ease:Circ.easeOut});
    //Going Away
    TweenLite.to(this.burgerking.nativeElement , 0.5, {right: "400px", opacity: 0, ease:Circ.easeOut, onComplete:this.onComplete, onCompleteParams:[this.burgerking]})
  }

  showIt(){
    this.burgerking.nativeElement.style.right = 0;
    this.burgerking.nativeElement.style.opacity = 1;
    this.burgerking.nativeElement.style.display = '';
    TweenLite.from(this.burgerking.nativeElement , 0.5, {right: "400px", opacity: 0, ease:Circ.easeOut});
  }

  onComplete(myobj){
    console.log(myobj);
    myobj.nativeElement.style.display = 'none';
  }


}
