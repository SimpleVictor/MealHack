import { Component, ViewChild } from '@angular/core';
import { NavController , AlertController} from 'ionic-angular';
import  * as mcdonald from '../../json/mcdonald';
import * as burgerking from '../../json/burgerking';
import * as tacobell from '../../json/tacobell';
import {SqlStorageService} from "../../providers/sqlstorage";
declare var TweenLite;
declare var Bounce;
declare var Circ;

@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {

  @ViewChild("mcdonald") mcdonald;
  @ViewChild("burgerking") burgerking;
  @ViewChild("tacobell") tacobell;
  @ViewChild("starbuck") starbuck;
  @ViewChild("kfc") kfc;
  @ViewChild("chipotle") chipotle;


  mcdonaldTab = "burger";
  burgerkingTab = "burger";
  tacobellTab = "taco";

  RestaurantNameOrder;

  currentRestaurant;
  originalHeight;

  mcdonald_menu;
  burgerking_menu;
  tacobell_menu;


  //PIZZA ANIMATION
  tabIcon;
  savedTop;
  savedLeft;
  pizzaIcon;


  //Check to see if restaurant has been expanded so click event isn't triggered
  checkClick:boolean = false;

  constructor(public navCtrl: NavController, public sqlstorage: SqlStorageService, public alertCtrl: AlertController){

    let objArray = []
    let str = "Victor?male3?CheatMeal^Big Mac,bigmac,1,empty;Coke,cup,1,no ice;Vanilla Cone,vanillacone,1,empty;World Famous Fries,fries,1,no salt;";

    let savedHolder = {
      creator: "",
      title: "",
      profile_pic: "",
      order: []
    };

    let splitStr = str.split("^");

    splitInfo(splitStr[0], splitStr[1]);

    // str.split('^').forEach((el, idx, array) => {
    //   console.log(el);
    //   splitMe();

      // console.log(el);
      // let x = el.split(',');
      // let newobj = {
      //   food_name: x[0],
      //   food_url: x[1],
      //   food_amount: x[2]
      // };
      // objArray.push(newobj);
      // if (idx === array.length - 1){
      //   objArray.splice(idx, 1);
      //   console.log(objArray);
      // };
    // });

    function splitInfo(info, order){
      let splitInfo = info.split("?");
      savedHolder.creator = splitInfo[0];
      savedHolder.profile_pic = splitInfo[1];
      savedHolder.title = splitInfo[2];
      console.log(savedHolder);
      splitOrder(order, () => {
        console.log("done!");
        console.log(savedHolder);
      });
    }

    //food_name, food_url,food_amount, food_comment

    function splitOrder(order, callback){
      let str2 = order;
      str2.split(";").forEach((el, idx, array) => {
        let x = el.split(',');
        let newX = {
          food_name: x[0],
          food_url: x[1],
          food_amount: x[2],
          food_comment: x[3]
        };
        savedHolder.order.push(newX);
        if (idx === array.length - 1){
          savedHolder.order.splice(idx, 1);
          callback();
        };
      });
    }


    this.mcdonald_menu = JSON.parse(mcdonald.mcdonald);
    this.burgerking_menu = burgerking.burgerking;
    this.tacobell_menu =  tacobell.tacobell;


    console.log(this.burgerking_menu);
    console.log(this.tacobell_menu);
    console.log(this.mcdonald_menu);
  }

  ionViewDidEnter(){
    this.RestaurantNameOrder = [
      this.mcdonald,
      this.burgerking,
      this.tacobell,
      this.starbuck,
      this.kfc,
      this.chipotle
    ];



      let obj = document.getElementById("home-title");
      TweenLite.from(obj, 0.4, {width:"0px",opacity: 0, ease:Circ.easeOut});

      let obj2 = document.getElementsByClassName("welcome-card");
      TweenLite.from(obj2, 0.2, {margin: "100px", opacity: 0, ease:Circ.easeOut});



  //  THIS IS FOR THE PIZZA ANIMATION
    this.tabIcon = document.getElementsByClassName("ion-md-restaurant");
    console.log(this.tabIcon[0].getBoundingClientRect());
    this.savedTop = this.tabIcon[0].getBoundingClientRect().top;
    this.savedLeft = this.tabIcon[0].getBoundingClientRect().left;

    this.pizzaIcon = document.getElementById("PizzaId");
    this.pizzaIcon.style.top = `${this.savedTop}px`;
    this.pizzaIcon.style.left = `${this.savedLeft}px`;





  }
  pickRestaurant(target){
    // (this.RestaurantNameOrder[target].nativeElement;
    // let cssObj = this.RestaurantNameOrder[target].nativeElement;

    if(!this.checkClick){
      this.checkClick = true;
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
  }

  hideIt(){
    TweenLite.to(this.burgerking.nativeElement , 0.5, {right: "400px", opacity: 0, ease:Circ.easeOut,onComplete:this.onComplete,   onCompleteParams:[this.burgerking]})
  }

  goBackToStart(){
    //Switch back click event
    this.checkClick = false;

    // console.log("bruh");
    // TweenLite.to(this.RestaurantNameOrder[this.currentRestaurant].nativeElement, 0.5 ,{height: "auto"});

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
        console.log(`Current Restaurant[${this.currentRestaurant}] is ignored during the repeat process`);
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
    // TweenLite.from(close, 1, {left:"-400px", opacity: 0, ease:Circ.easeOut, rotation: 1000,delay: 0.5});
    TweenLite.from(close, 1, {left:"-400px", opacity: 0, ease:Circ.easeOut, rotation: 1000});
    // Food List
    // console.log(foodlist);
    // foodlist[0].style.display = "";
    TweenLite.from(foodlist[0], 0.5, {right:"500px", opacity: 0, ease:Circ.easeOut});





  }


  addFoodItem(myevent, item){
    console.log(item);

    let alert = this.alertCtrl.create();
    alert.setTitle('Lightsaber color');

    alert.addInput({
      type: 'radio',
      label: '1',
      value: '1',
      checked: true
    });
    for(let i = 2; i < 10; i++){
      alert.addInput({
        type: 'radio',
        label: `${i}`,
        value: `${i}`,
        checked: false
      });
    };


    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log(data);
        item.amount = data;
        this.sqlstorage.AddItemToDraft(item).then(
          (data) => console.log("Added Succesfully"),
          (err) => console.log(err)
        );

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
    });
    alert.present();






  }

  safetyButton(){
    this.goBackToStart();
  }

}
