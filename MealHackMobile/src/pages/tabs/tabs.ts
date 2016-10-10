import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {Setting} from "../setting/setting";
import {Barcode} from "../barcode/barcode";
import {Menu} from "../menu/menu";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root = HomePage;
  tab2Root = Menu;
  tab3Root = Barcode;
  tab4Root = Setting;

  constructor() {

  }
}
