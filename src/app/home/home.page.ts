import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
export interface Screen {
  width: Number;
  thick: Number;
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  public thresholdConfig = {
    '0': {color: 'green'},
    '40': {color: 'orange'},
    '75.5': {color: 'red'}
  };
  public dataDHT: any = null;
  public screenDisplay: Screen= {
    // height: screen.availHeight / 2.5,
     width: 0 ,
     thick: 0
   };
  public sw_toggle: boolean = false;
  public intervalReadScreen: any = null;
  constructor(public fb: AngularFireDatabase) {
    /*this.fb.list('/logs').push(
    {
      'Temperature': Math.random() * 100  , 'Huminity': Math.random() * 100 ,
      time: new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()
    });*/

    
  }

  ngOnInit() {
    this.intervalReadScreen = setInterval(() => {
      this.screenDisplay = {
       // height: screen.availHeight / 2.5,
        width: screen.availWidth / 3 ,
        thick: screen.availWidth / 40
      }
    } , 100);

    this.fb.object('/DHT').valueChanges().subscribe((value: any) => {this.dataDHT = value; }); // ใช้อันนี้ ติดตามตลอด
    // this.fb.object('/DHT').valueChanges().toPromise().then((value: any) => {console.log(value);});อันนี้ติดตามบางช่วงแต่ใช้ไม่ได้
    this.fb.object('/sw_1').valueChanges().subscribe((val:boolean)=>{
      this.sw_toggle = val;

    });
  }

ngOnDestroy() {
  clearInterval(this.intervalReadScreen);
}

  public onChange() {
    this.fb.object('/sw_1').set(this.sw_toggle);
    console.log(this.sw_toggle);
  }

}
