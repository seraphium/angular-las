/**
 * Created by zezhang on 2017/5/9.
 */

import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {Unit} from "../models/unit.model";
import {User} from "../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UnitService} from "../services/units.service";
import {UserService} from "../services/user.service";
import {isUndefined} from "util";
import {Sms} from "../models/sms.model";
import {SmsService} from "../services/sms.service";
import {UnitEditDialogComponent} from "../dialogs/";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";


@Component({
  selector: 'unitinfo',
  templateUrl: './unitinfo.component.html',

})
export class UnitinfoComponent implements OnInit {
  selectedUnit:Unit;
  currentUser: User;
  isSubmitting: boolean;

  @ViewChild(UnitEditDialogComponent)
  public readonly _modal: UnitEditDialogComponent;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unitService:  UnitService,
    private userService: UserService,
    private smsService: SmsService,

  ){

  }


  ngOnInit()
  {

    this.unitService.selectedUnit.subscribe(unit => {
      this.selectedUnit = unit;
      this._modal.patchValue(unit);
    });
  }

 getPhoto(unit: Unit){
      console.log(unit.id + " get photo");
    let sms = new Sms();
    this.isSubmitting = true;
    sms.time = new Date().toISOString();
    sms.sender = '13800000000';
    sms.direction = 0;
    sms.receiver = unit.phonenum;
    sms.state = 0; //pending
    sms.content = "##HR1";
    sms.device_id = unit.id;
    sms.checksumcorrect = true;
    this.smsService.save(sms).subscribe(sms => {
      console.log(sms);
      this.isSubmitting = false;
      alert("sms sent succeed");
    },
    error => {
      this.isSubmitting = false;
      alert(JSON.stringify(error.errors));
    })
  }

  modifyUnit(unit: Unit) {
    this._modal.show();
  }


}
