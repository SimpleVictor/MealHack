import { Component, OnInit } from '@angular/core';
import {ViewController, NavParams} from "ionic-angular";

@Component({
    templateUrl: 'build/pages/home/signup/signup.html',
})
export class SignUpPage implements OnInit {

  clientHeight;
  clientWidth;

  constructor(private vControl: ViewController) {
      this.clientHeight = window.innerHeight;
      this.clientWidth = window.innerWidth;
      console.log(this.clientHeight, this.clientWidth);



    }

    ngOnInit() { }

  DismissModal(){
    this.vControl.dismiss();
  }

}
