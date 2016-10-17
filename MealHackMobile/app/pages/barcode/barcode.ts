import { Component} from '@angular/core';
import { NavController, AlertController, ModalController} from 'ionic-angular';
import {SqlStorageService} from "../../providers/sqlstorage";
import {SavedModal} from "./saved-modal/saved-modal";

declare var TweenLite;
declare var Circ;

declare var $;

@Component({
  templateUrl: 'build/pages/barcode/barcode.html'
})
export class Barcode {

  BarcodeTabs= "draft";
  profile;
  header2;
  draftItems;
  profileInfo;
  foodTable;
  scanTable;

  savedItems:any[] = [];
  scannedItems:any[] = [];

  constructor(public navCtrl: NavController, public sqlstorage: SqlStorageService, public alertCtrl: AlertController, private modalCtrl: ModalController) {
    this.profile = document.getElementsByClassName("page-barcode");
    this.header2 = document.getElementsByClassName("tab-header");
  }


  ionViewDidEnter(){
    this.sqlstorage.RetreiveAllTable((result) => {
      console.log(result)
      this.draftItems = result.draft_table;
      this.profileInfo = result.profile_table;
      this.foodTable = result.food_table;
      this.scanTable = result.scanned_table;
      this.SplitUpSavedData(result.food_table);
      this.SplitUpScannedData(result.scanned_table);

      // console.log(this.draftItems);
    });

    let obj = document.getElementById("barcode-title");
    TweenLite.from(obj, 0.4, {width:"0px",opacity: 0, ease:Circ.easeOut});

    let cards = document.getElementsByClassName("barcode-card");
    TweenLite.from(cards, 0.2, {margin:"100px",ease:Circ.easeOut});

  }

  public SplitUpSavedData(data){
    this.savedItems = [];
    for(let i = 0; i < data.length; i++) {
      let savedHolder = {
        creator: "",
        title: "",
        profile_pic: "",
        order: [],
        id: data[i].id
      };

      let splitStr = data[i].saved_food.split("^");




      let splitInfo = (info, order) => {
        let splitInfo = info.split("?");
        savedHolder.creator = splitInfo[0];
        savedHolder.profile_pic = splitInfo[1];
        savedHolder.title = splitInfo[2];
        splitOrder(order, () => {
          this.savedItems.push(savedHolder);
        });
      };

      splitInfo(splitStr[0], splitStr[1]);

      //food_name, food_url,food_amount, food_comment

      function splitOrder(order, callback) {
        let str2 = order;
        str2.split(";").forEach((el, idx, array) => {
          let x = el.split(',');
          let newX = {
            food_name: x[0],
            food_url: x[1],
            food_amount: x[2],
            food_comment: x[3]
          };
          savedHolder.order.push(newX);
          if (idx === array.length - 1) {
            savedHolder.order.splice(idx, 1);
            callback();
          }
          ;
        });
      }
      if(i === (data.length - 1)){
        console.log(this.savedItems);
      };
    }
  }


  SplitUpScannedData(data){
    this.scannedItems = [];
    for(let i = 0; i < data.length; i++) {
      let savedHolder2 = {
        creator: "",
        title: "",
        profile_pic: "",
        order: [],
        id: data[i].id
      };

      let splitStr = data[i].scanned_food.split("^");




      let splitInfo = (info, order) => {
        let splitInfo = info.split("?");
        savedHolder2.creator = splitInfo[0];
        savedHolder2.profile_pic = splitInfo[1];
        savedHolder2.title = splitInfo[2];
        splitOrder(order, () => {
          this.scannedItems.push(savedHolder2);
        });
      };

      splitInfo(splitStr[0], splitStr[1]);

      //food_name, food_url,food_amount, food_comment

      function splitOrder(order, callback) {
        let str2 = order;
        str2.split(";").forEach((el, idx, array) => {
          let x = el.split(',');
          let newX = {
            food_name: x[0],
            food_url: x[1],
            food_amount: x[2],
            food_comment: x[3]
          };
          savedHolder2.order.push(newX);
          if (idx === array.length - 1) {
            savedHolder2.order.splice(idx, 1);
            callback();
          }
          ;
        });
      }
      if(i === (data.length - 1)){
        console.log(this.scannedItems);
      };
    }
  }


  public RefreshData(){
    this.sqlstorage.RetreiveAllTable((result) => {
      console.log(result)
      this.draftItems = result.draft_table;
      this.profileInfo = result.profile_table;
      this.SplitUpSavedData(result.food_table);
      this.SplitUpScannedData(result.scanned_table);
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

  public ResetDraftFromGenerate():void{
    this.sqlstorage.ResetEverythingInDraft((result) => {
      if(result){
        this.RefreshData();
      }else{
        console.log("There was an error in deleting the table");
      }
    })
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


      let prompt = this.alertCtrl.create({
        title: 'Order Title',
        message: "Title your food orders",
        inputs: [
          {
            name: 'food_title',
            placeholder: 'My Cheat Meal'
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
              this.sqlstorage.SendOffDraft(this.draftItems, data.food_title, () => {
                let alerts = this.alertCtrl.create({
                  title: 'Saved',
                  subTitle: 'You order has been saved!',
                  buttons: ['OK']
                });
                setTimeout(() => {
                  this.ResetDraftFromGenerate();
                  alerts.present();
                },300);
              });
            }
          }
        ]
      });
      prompt.present();
    }
  }

  public DeleteFromSaved(id):void{
    console.log(id);
    this.sqlstorage.DeleteFromTheSavedTable(id).then(
      (data) => {
        let alerts = this.alertCtrl.create({
          title: 'Deleted',
          subTitle: 'Your saved order has been deleted!',
          buttons: ['OK']
        });
        this.RefreshData();
        alerts.present();

      }, (err) => {
        console.log("Error deleting table");
        console.log(err);
      }
    );
  }

  public OpenSavedItemModal(order, id):void{
    this.sqlstorage.GetFoodTableById(id).then(
      (data) => {

        let newObj = [];
        for(let i = 0; i < data.res.rows.length; i++){
          newObj.push(data.res.rows.item(i))
        };


        let modal = this.modalCtrl.create(SavedModal, {order: order, raw: newObj[0].saved_food});
        modal.onDidDismiss(() => {
          // this.CreateProfileAccount(Dataresults);
          this.BackgroundOpacity(true);
        });
        this.BackgroundOpacity(false);
        modal.present();

      }, (err) => console.log(err)
    );
  }


  public DeleteScanned(id):void{
    console.log(id);
    this.sqlstorage.DeleteFromTheScannedTable(id).then(
      (data) => {
        let alerts = this.alertCtrl.create({
          title: 'Deleted',
          subTitle: 'Your saved order has been deleted!',
          buttons: ['OK']
        });
        this.RefreshData();
        alerts.present();
      }, (err) => {
        console.log("FAILED TO DELETE");
        console.log(err);
      }
    )
  }

  public SaveScannedToSaved(id):void{
    for(let i = 0; i < this.scanTable.length; i++){
      if(id === this.scanTable[i].id){
        this.sqlstorage.SendScanDataIntoScannedTable(this.scanTable[i].scanned_food).then(
          (data) => {
            let alerts = this.alertCtrl.create({
              title: 'Saved',
              subTitle: 'Your scanned data has been saved!',
              buttons: ['OK']
            });
            this.RefreshData();
            alerts.present();
          }, (err) => {
            console.log("problem saving data into DATA");
            console.log(err);
          }
        );
      };
    };
  }


  public BackgroundOpacity(value){
    if(value){
      this.profile[0].setAttribute("style", "background-color: '';");
      this.header2[0].setAttribute("style", "background-color: '';");
    }else{
      this.profile[0].setAttribute("style", "opacity: 0.5;background-color: #363838;-webkit-filter: blur(5px);moz-filter: blur(5px);-o-filter: blur(5px);-ms-filter: blur(5px);filter: blur(5px);");
      this.header2[0].setAttribute("style", "opacity: 0.5;background-color: #363838 !important;-webkit-filter: blur(5px);moz-filter: blur(5px);-o-filter: blur(5px);-ms-filter: blur(5px);filter: blur(5px);");
    }
  }



}
