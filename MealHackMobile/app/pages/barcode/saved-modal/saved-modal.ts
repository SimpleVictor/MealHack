import { Component} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

declare var TweenLite;
declare var Circ;
declare var Bounce;

@Component({
  templateUrl: 'build/pages/barcode/saved-modal/saved-modal.html'
})
export class SavedModal {


  saveOrders;
  handIcon;

  constructor(private navParams: NavParams){
    let orders = this.navParams.get("order");
    this.saveOrders = orders;
    console.log(this.saveOrders);



  }

  ionViewDidEnter(){

    // let handIcon = document.getElementById("handIcon");
    // console.log(handIcon);
    // let myAnimation = TweenLite.from(handIcon, 1, {top: "20px",ease:Bounce.easeOut, onComplete: onComplete});
    //
    // function onComplete(){
    //   console.log("done");
    //   // myAnimation.reverse(false, false);
    //   myAnimation.restart(false, false);
    // }

    let closeMarker = window.document.getElementById("close-marker");
    console.log(closeMarker);
    TweenLite.from(closeMarker, 1, {left:"300px !important",opacity: 0,ease:Circ.easeOut, rotation: 1000, onComplete: onCloseComplete});

    function onCloseComplete(){
      console.log("done1");
    }

  }

}
