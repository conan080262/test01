import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { MyserviceService } from '../service/myservice.service';
import { AlertController } from '@ionic/angular';


// tslint:disable-next-line:class-name
export interface data {
  key : String;
  payload : any;
}

@Component({
  selector: "app-list",
  templateUrl: "list.page.html",
  styleUrls: ["list.page.scss"]
})
export class ListPage implements OnInit {
  public dataLogs: Array<any> = [];
  // tslint:disable-next-line:no-inferrable-types
  public searchLogs: string = '';
  public dataLogsSearch: Array<any> = [];

  constructor(public fb: AngularFireDatabase, public ms: MyserviceService, public alertController: AlertController) {
    // this.fb.object('/logs/-LbgY96irhpnzUC1z3Es/Huminity').set(99);
  }

  ngOnInit() {
    this.fb
      .list("/logs")
      .snapshotChanges()
      .subscribe((value: any) => {
        this.dataLogs = [];
        value.forEach(element => {
          this.dataLogs.push({
            key: element.key,
            payload: element.payload.val()
          });
        });
        this.onSearch(this.searchLogs);
      });
  }

  public removelog(id: string) {
    this.ms.presentAlertConfirm('ยืนยันการลบข้อมูล').then((value: boolean) => {
      this.dataLogs = [];
      this.fb.object("/logs/" + id).remove();
      // this.fb.list('/logs').remove(id);
    }).catch(async (reason: boolean) => {
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Subtitle',
        message: 'ยกเลิกเรียบร้อยแล้ว',
        buttons: ['OK']
      });

      await alert.present();

    });
  }

  public onSearch(text : string) {
    let txt = new RegExp(text, "gi");
    // tslint:disable-next-line:triple-equals
    this.dataLogsSearch =
      text.length > 0
        ? this.dataLogs.filter(
            (c: any) =>
              c.payload.time.search(txt) != -1 ||
              c.payload.Huminity.toString().search(txt) != -1 ||
              c.payload.Temperature.toString().search(txt) != -1
          )
        : this.dataLogs;
  }

  public convertJson(data2: data) {
    return JSON.stringify(data2);
  }
} 
