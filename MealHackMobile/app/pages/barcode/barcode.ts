import { Component} from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public sqlstorage: SqlStorageService, public alertCtrl: AlertController) {

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

  public RefreshData(){
    this.sqlstorage.RetreiveAllTable((result) => {
      console.log(result)
      this.draftItems = result.draft_table;
      this.profileInfo = result.profile_table;
      console.log(this.draftItems);
    });
  }


  public DeleteDraftItem(id):void{
    this.sqlstorage.DeleteIndividualDraft(id).then(
      (data) => this.RefreshData(),
      (err) => console.log(err)
    );
  }


  public UpdateDraftItem(id, current):void{
    console.log(id);

    let alert = this.alertCtrl.create();
    alert.setTitle('Lightsaber color');

    for(let i = 1; i < 10; i++){
      let num = i;
      let n = num.toString();
      if(current === n){
        console.log("here"+ i);
        alert.addInput({
          type: 'radio',
          label: `${i} (current)`,
          value: `${i}`,
          checked: true
        });
      }else{
        alert.addInput({
          type: 'radio',
          label: `${i}`,
          value: `${i}`,
          checked: false
        });
      }
    };

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.sqlstorage.UpdateIndividualDraftItem(data, id).then(
          (data) => this.RefreshData(),
          (err) => console.log(err)
        );
      }
    });
    alert.present();
  }

  public ResetDraft():void {

    if(!this.draftItems.length){
      let alert = this.alertCtrl.create({
        title: 'Food Draft is empty',
        subTitle: `Seems like your food is undefined..Just like my girlfriend`,
        buttons: ['OK']
      });
      alert.present();
    }else{
      this.sqlstorage.ResetEverythingInDraft((result) => {
        if(result){
          let alert = this.alertCtrl.create({
            title: 'Reset',
            subTitle: `Your draft's content has been removed`,
            buttons: ['OK']
          });
          alert.present();
          this.RefreshData();
        }else{
          console.log("There was an error in deleting the table");
        }
      })
    }


  }

  public AddNote(id):void{
    let prompt = this.alertCtrl.create({
      title: 'Food Notes',
      message: "List some food notes.",
      inputs: [
        {
          name: 'food_note',
          placeholder: 'No cheese on the burger!'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.sqlstorage.AddFoodNote(data.food_note, id).then(
              (data) => {
                console.log("Added Note Success!");
                this.RefreshData();
              }, (err) => {
                console.log(err);
              }
            );
          }
        }
      ]
    });
    prompt.present();

  }

  public generateCode():void{

    if(!this.draftItems.length){
      let alert = this.alertCtrl.create({
        title: 'Food Draft is empty',
        subTitle: 'Seems like your food is undefined..Just like my girlfriend',
        buttons: ['OK']
      });
      alert.present();
    }else{
      this.sqlstorage.SendOffDraft(this.draftItems);

      let alert = this.alertCtrl.create({
        title: 'Saved',
        subTitle: 'You order has been saved!',
        buttons: ['OK']
      });
      alert.present();
    }
  }




}
