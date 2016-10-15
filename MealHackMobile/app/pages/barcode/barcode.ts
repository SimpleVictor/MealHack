import { Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import {SqlStorageService} from "../../providers/sqlstorage";

declare var TweenLite;
declare var Circ;

declare var $;

@Component({
  templateUrl: 'build/pages/barcode/barcode.html'
})
export class Barcode {

  BarcodeTabs= "draft";
  draftItems;
  profileInfo;
  scannedItems;
  savedItems;

  constructor(public navCtrl: NavController, public sqlstorage: SqlStorageService) {

  }


  ionViewDidEnter(){
    this.sqlstorage.RetreiveAllTable((result) => {
      console.log(result)
      this.draftItems = result.draft_table;
      this.profileInfo = result.profile_table;
      console.log(this.draftItems);
    });

    let obj = document.getElementById("barcode-title");
    TweenLite.from(obj, 0.4, {width:"0px",opacity: 0, ease:Circ.easeOut});

    let cards = document.getElementsByClassName("barcode-card");
    TweenLite.from(cards, 0.2, {margin:"100px",ease:Circ.easeOut});

  }

  public ResetData(){
    this.sqlstorage.RetreiveAllTable((result) => {
      console.log(result)
      this.draftItems = result.draft_table;
      this.profileInfo = result.profile_table;
      console.log(this.draftItems);
    });
  }


  public DeleteDraftItem(id):void{
    this.sqlstorage.DeleteIndividualDraft(id).then(
      (data) => this.ResetData(),
      (err) => console.log(err)
    );
  }




}
