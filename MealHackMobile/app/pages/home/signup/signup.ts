import { Component, OnInit , ViewChild} from '@angular/core';
import {ViewController, NavParams, LoadingController} from "ionic-angular";
// import {SqlStorageService} from "../../../providers/sqlstorage";
import {SqlStorageService} from "../../../providers/sqlstorage";


@Component({
    templateUrl: 'build/pages/home/signup/signup.html',
})
export class SignUpPage implements OnInit {

  @ViewChild("myValue") myValue;

  clientHeight;
  clientWidth;

  inputValue = null;


  myColor = {
    male1 : true,
    male2: false,
    male3: false,
    female1: false,
    female2: false,
    female3: false
  };

  currentColor = "male1";
  CheckLoader;

  constructor(private vControl: ViewController) {
      this.clientHeight = window.innerHeight;
      this.clientWidth = window.innerWidth;
      console.log(this.clientHeight, this.clientWidth);
    }

  ngOnInit() { }

  DismissModal(){
    let obj = {
      name: this.myValue.value,
      picture: this.currentColor
    };
    console.log(obj);
    this.vControl.dismiss(obj);
  }

  switchProfilePicture(data){
    this.myColor[this.currentColor] = false;
    this.currentColor = data;
    this.myColor[this.currentColor] = true;
  }

}
