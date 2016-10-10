import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {Menu} from "../pages/menu/menu";
import {Barcode} from "../pages/barcode/barcode";
import {Setting} from "../pages/setting/setting";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Menu,
    Barcode,
    Setting,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Menu,
    Barcode,
    Setting,
    HomePage,
    TabsPage
  ],
  providers: []
})
export class AppModule {}
