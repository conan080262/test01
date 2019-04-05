import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  public dataLogs = [];
  constructor(public fb: AngularFireDatabase) {
    //this.fb.object('/logs/-LbgY96irhpnzUC1z3Es/Huminity').set(99);
  }

  ngOnInit() {
    //this.dataLogs = [];
    this.fb.list('/logs').snapshotChanges().subscribe((value: any) => {
      value.forEach(element => {
        this.dataLogs.push({
          key: element.key ,
          payload : element.payload.val()
        });
      });
      console.log(this.dataLogs);
    });
  }

  public removelog(id: string) {
    this.dataLogs = [];
    if (confirm('ยืนยันการลบข้อมูล')) {
      this.fb.object('/logs/' + id).remove();
      // this.fb.list('/logs').remove(id);
    }
    return false;
  }

}
