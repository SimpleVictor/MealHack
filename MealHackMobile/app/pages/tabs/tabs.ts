import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from "../home/home";
// import {Menu} from "../menu/menu";
import {Barcode} from "../barcode/barcode";
import {Setting} from "../setting/setting";

/*
  Generated class for the TabsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/tabs/tabs.html',
})
export class TabsPage {
  tab1Root = HomePage;
  // tab2Root = Menu;
  tab2Root = Barcode;
  tab3Root = Setting;
  constructor(private navCtrl: NavController) {

  }

}
