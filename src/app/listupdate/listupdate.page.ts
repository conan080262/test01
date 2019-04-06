import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-listupdate',
  templateUrl: './listupdate.page.html',
  styleUrls: ['./listupdate.page.scss'],
})
export class ListupdatePage implements OnInit {

public formUpdateList: FormGroup;

  constructor(private route: ActivatedRoute, private formBuild: FormBuilder, public fb: AngularFireDatabase, private router: Router) { }

  ngOnInit() {
    let dataRoute = JSON.parse(this.route.snapshot.paramMap.get('data'));
    this.formUpdateList = this.formBuild.group({
      key: [dataRoute.key, Validators.required],
      Huminity: [dataRoute.payload.Huminity , Validators.required],
      Temperature: [dataRoute.payload.Temperature, Validators.required],
      time: [dataRoute.payload.time, Validators.required]
    });
  }

  public onUpdate() {
    let keyUpdate = this.formUpdateList.value.key;
    if (confirm('ยืนยันการแก้ไข')) {
      delete this.formUpdateList.value.key;
      this.fb.object('/logs/' + keyUpdate)
      .update(this.formUpdateList.value)
      .then((value: any) => {
        // ArrowFunction
        this.router.navigate(['/list']);
      }).catch((reason: any) => {

      });
      // console.log(this.formUpdateList.value);
    }
    return false;
  }
}
