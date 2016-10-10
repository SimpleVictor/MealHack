import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Menu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class Menu {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Menu Page');
  }

}
