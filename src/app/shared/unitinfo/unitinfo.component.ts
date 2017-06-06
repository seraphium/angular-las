/**
 * Created by zezhang on 2017/5/9.
 */

import {Component, OnInit} from "@angular/core";
import {Unit} from "../models/unit.model";
import {User} from "../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UnitService} from "../services/units.service";
import {UserService} from "../services/user.service";
import {isUndefined} from "util";
import {Sms} from "../models/sms.model";
import {SmsService} from "../services/sms.service";


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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unitService:  UnitService,
    private userService: UserService,
    private smsService: SmsService
  ){

  }


  ngOnInit()
  {

    this.unitService.selectedUnit.subscribe(unit => {
      this.selectedUnit = unit;


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


}
