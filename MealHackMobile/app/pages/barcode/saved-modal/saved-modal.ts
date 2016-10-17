import { Component} from '@angular/core';
import { NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {QrModal} from "../qr-modal/qr-modal";

declare var TweenLite;
declare var Circ;
declare var Bounce;

@Component({
  templateUrl: 'build/pages/barcode/saved-modal/saved-modal.html'
})
export class SavedModal {


  saveOrders;
  handIcon;
  profile;
  rawStr;
  myAnimation;

  constructor(private navParams: NavParams, private vc: ViewController, private modalCtrl: ModalController){
    let orders = this.navParams.get("order");
    this.saveOrders = orders;
    // console.log(this.saveOrders);

    this.rawStr = this.navParams.get("raw");




    this.profile = document.getElementsByClassName("saved-modal")


  }

  ionViewDidEnter(){

    let handIcon = document.getElementById("handIcon");
    this.myAnimation = TweenLite.from(handIcon, 1, {top: "20px",ease:Bounce.easeOut, onComplete: onComplete, onCompleteParams: [this]});

    function onComplete(vm){
      // console.log("done");
      // myAnimation.reverse(false, false);
      vm.myAnimation.restart(false, false);
    }

    // let closeMarker = window.document.getElementById("close-marker");
    // console.log(closeMarker);
    // TweenLite.from(closeMarker, 1, {left:"300px !important",opacity: 0,ease:Circ.easeOut, rotation: 1000, onComplete: onCloseComplete});
    //
    // function onCloseComplete(){
    //   console.log("done1");
    // }

  }

  DismissModal(){
    this.myAnimation.pause();
    this.vc.dismiss();
  }

  openQrModal(){
    let modal =this.modalCtrl.create(QrModal, {rawstr: this.rawStr});
    modal.onDidDismiss(() => {
      this.BackgroundOpacity(true);
    });
    this.BackgroundOpacity(false);
    this.myAnimation.pause();
    modal.present();
  }

  public BackgroundOpacity(value){
    if(value){
      this.profile[0].setAttribute("style", "background-color: '';");
    }else{
      // this.profile[0].setAttribute("style", "opacity: 0.5;-webkit-filter: blur(5px);moz-filter: blur(5px);-o-filter: blur(5px);-ms-filter: blur(5px);filter: blur(5px);");
      this.profile[0].setAttribute("style", "-webkit-filter: blur(5px);moz-filter: blur(5px);-o-filter: blur(5px);-ms-filter: blur(5px);filter: blur(5px);");
    }
  }

}
