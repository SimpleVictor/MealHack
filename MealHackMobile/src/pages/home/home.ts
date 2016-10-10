import { Component, ViewChild } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { NavController, Slides } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('mySlider') slider: Slides;
  options;

  constructor(public navCtrl: NavController) {


    Geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(`Lat: ${resp.coords.latitude}`);
      console.log(`Lat: ${resp.coords.longitude}`);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.options = {
      pagination: '.swiper-pagination',
      slidesPerView: 1,
      paginationClickable: true
    };

  }

  testDrag(val){
    // console.log(val);
    // console.log(this.slider.getSlider());
    // console.log(Math.round(val.touches.diff));
  }

  onSlidedChanged(){
    // console.log("damn daniel");
  }


}
