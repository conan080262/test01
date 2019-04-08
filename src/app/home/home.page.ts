import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MicrogearService } from '../service/microgear.service';
export interface Screen {
  width: Number;
  thick: Number;
}
// https://github.com/bblanchon/ArduinoJson?fbclid=IwAR161d8-h1ktt2-6bRZl7cIt_gTCXNDpBwsmGElytQ_bn1k9bf5uEBjk8cc LIB_ArduinoFirebase
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
  constructor(public fb: AngularFireDatabase, public mg_se: MicrogearService) {
    /*this.fb.list('/logs').push(
    {
      'Temperature': Math.random() * 100  , 'Huminity': Math.random() * 100 ,
      time: new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()
    });*/

    
  }

  ngOnInit() {
    // tslint:disable-next-line:prefer-const
    let microgear = this.mg_se.microgear();
    microgear.on('connected', () => {
      microgear.subscribe('/arduino/+');
      microgear.subscribe('/ionic/+');
    });

    microgear.on('message', (topic: string, msg: any) => {
      // if (topic.split('/')[2] !== 'ionic') {
      //   console.log(topic + '-->' + msg);
      // }
     console.log(topic + '-->' + msg);
    }); // interval ตลอดเวลายุแล้ว
  
// ----------------------firebase--------------------- //
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
    let microgear = this.mg_se.microgear();
    this.fb.object('/sw_1').set(this.sw_toggle).then(() => {
      microgear.publish("/ionic/sw1" , this.sw_toggle + "");
    });
    console.log(this.sw_toggle);
  }

}
