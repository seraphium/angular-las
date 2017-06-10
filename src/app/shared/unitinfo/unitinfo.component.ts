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
import {ShowDialogComponent} from "../dialogs/dialog.component";
import {FormGroup} from "@angular/forms/src/model";
import {FormBuilder} from "@angular/forms";


@Component({
  selector: 'unitinfo',
  templateUrl: './unitinfo.component.html'
})
export class UnitinfoComponent implements OnInit {
  selectedUnit:Unit;
  currentUser: User;
  canModify: boolean;
  isSubmitting = false;
  isDeleting = false;

  unitBasicForm: FormGroup;
  unitAlertForm: FormGroup;

  errors: Object = {};

  modifyType: number = 0;

  @ViewChild(ShowDialogComponent)
  public readonly _modal: ShowDialogComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unitService:  UnitService,
    private userService: UserService,
    private smsService: SmsService,
    private fb: FormBuilder

  ){

  }

  setModifyType(type: number){
      this.modifyType = type;
  }

  ngOnInit()
  {
    this.unitBasicForm = this.fb.group({
      towerfrom: '',
      towerto: '',
      idintower: ""
    });

    this.unitAlertForm = this.fb.group({
      distance1: '',
      distance2: '',
      distance3: ""
    });



    this.unitService.selectedUnit.subscribe(unit => {
      this.selectedUnit = unit;
      this.unitBasicForm.patchValue(unit);

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
    })
  }

  modifyUnit(unit: Unit) {
    this._modal.show();
  }

  updateUnit(values: Object){
    (<any>Object).assign(this.selectedUnit, values);

  }
  submitModify() {
    this.isSubmitting = true;
    this.updateUnit(this.unitBasicForm.value);

    this.unitService.save(this.selectedUnit)
      .subscribe(
        unit => {
          this._modal.hide();
        },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      });

  }


}
