import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from "../home/home";
// import {Menu} from "../menu/menu";
import {Barcode} from "../barcode/barcode";
import {Setting} from "../setting/setting";
import {SqlStorageService} from "../../providers/sqlstorage";

/*
  Generated class for the TabsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/tabs/tabs.html',
})
export class TabsPage{

  myElem;

  tab1Root = HomePage;
  // tab2Root = Menu;
  tab2Root = Barcode;
  tab3Root = Setting;



  myBadge:number = 0;



  constructor(private navCtrl: NavController, public sqlstorage: SqlStorageService) {
  }

  ionViewDidEnter(){

    // let BadgeNumber = this.myElem.children[2].attributes['ng-reflect-tab-badge'].value;
    // this.myElem.children[2].attributes['ng-reflect-tab-badge'].value = 4;

  }

  // ngAfterContentChecked(){
  //   this.myBadge = this.sqlstorage.GetBadgeNumber();
  // }

}
