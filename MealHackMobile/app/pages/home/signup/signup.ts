import { Component, OnInit } from '@angular/core';
import {ViewController, NavParams} from "ionic-angular";

declare var cordova;

@Component({
    templateUrl: 'build/pages/home/signup/signup.html',
})
export class SignUpPage implements OnInit {

  clientHeight;
  clientWidth;

  myColor = {
    male1 : true,
    male2: false,
    male3: false,
    female1: false,
    female2: false,
    female3: false
  };

  currentColor = "male1";

  constructor(private vControl: ViewController) {
      this.clientHeight = window.innerHeight;
      this.clientWidth = window.innerWidth;
      console.log(this.clientHeight, this.clientWidth);
    }

  ngOnInit() { }

  DismissModal(){
    this.vControl.dismiss();
  }

  switchProfilePicture(data){
    cordova.plugins.Keyboard.show();
    this.myColor[this.currentColor] = false;
    this.currentColor = data;
    this.myColor[this.currentColor] = true;
  }

}
