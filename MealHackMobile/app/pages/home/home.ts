import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import  * as mcdonald from '../../json/mcdonald';

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

  mcdonald_menu;

  constructor(public navCtrl: NavController) {
    this.mcdonald_menu = JSON.parse(mcdonald.mcdonald);
    console.log(this.mcdonald_menu);
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
    // console.log("bruh");
    // TweenLite.to(this.RestaurantNameOrder[this.currentRestaurant].nativeElement, 0.5 ,{height: "auto"});


    console.log(this.currentRestaurant);
    //HIDE THE MENU LIST
    this.RestaurantNameOrder[this.currentRestaurant].nativeElement.children[2].style.display = "none";
    //IMG
    let img = this.RestaurantNameOrder[this.currentRestaurant].nativeElement.children[1];
    TweenLite.to(img , 0.5, {height:"130px", ease:Circ.easeIn, onComplete: ImgComplete});
    //CLOSE
    let close = window.document.getElementById("close-marker");
    TweenLite.to(close, 1, {left:"-400px",ease:Circ.easeOut, rotation: 1440, onComplete: CloseFinish});


    //BRING BACK OTHER RESTAURANT
    for(let i = 0; i < this.RestaurantNameOrder.length ; i++){
      if(i === this.currentRestaurant){
        console.log("yes");
      }else{
        this.RestaurantNameOrder[i].nativeElement.style.display = "";
        this.RestaurantNameOrder[i].nativeElement.style.right = "";
        this.RestaurantNameOrder[i].nativeElement.style.opacity = "1";
        TweenLite.from(this.RestaurantNameOrder[i].nativeElement, 0.5, {right:"400px" ,opacity: 0, ease:Circ.easeOut, onComplete:MenuFinish, onCompleteParams:[this.RestaurantNameOrder[i]]});

      }
    }


    function CloseFinish(){
      // close.style.opacity = "1";
      close.style.left = "85%";
      close.style.display = "none";
    }

    function MenuFinish(obj){
    }

    function ImgComplete(){
      img.style.height = "auto";
    }


    // for(let i = 0; i < this.RestaurantNameOrder.length; i++){

    // }
    // this.burgerking.nativeElement.style.right = 0;
    // this.burgerking.nativeElement.style.opacity = 1;
    // this.burgerking.nativeElement.style.display = '';
    // TweenLite.from(this.burgerking.nativeElement , 0.5, {right: "400px", opacity: 0, ease:Circ.easeOut});
  }

  onComplete(myobj){
    // console.log("completed");
    myobj.nativeElement.style.display = 'none';
  }

  expandRestaurant(obj){
    // console.log(obj.nativeElement.children[]);
    let img = obj.nativeElement.children[1];
    let text = obj.nativeElement.children[0];
    let card = obj.nativeElement;
    let close = window.document.getElementById("close-marker");
    let foodlist = window.document.getElementsByClassName("foodlist");
    close.style.display = "";
    console.log(close);
    // obj.nativeElement.children[0].style.display = 'none';
    // obj.nativeElement.children[2].style.display = 'none';
    obj.nativeElement.children[2].style.display = '';
    //Text
    TweenLite.to(text, 0.5, {top:"0", "padding-bottom": "15px", ease:Circ.easeOut});
    //Img
    TweenLite.to(img, 0.5, {height:"250px", ease:Circ.easeOut});
    //Card
    TweenLite.to(card, 0.5, {height:"auto" ,ease:Circ.easeOut});
    //Close Marker
    TweenLite.from(close, 1, {left:"-400px", opacity: 0, ease:Circ.easeOut, rotation: 1000,delay: 0.5});
    // Food List
    // console.log(foodlist);
    // foodlist[0].style.display = "";
    TweenLite.from(foodlist[0], 0.5, {right:"500px", opacity: 0, ease:Circ.easeOut});





  }


  safetyButton(){
    this.goBackToStart();
  }

}
