/**
 * Created by jackiezhang on 2017/6/12.
 */

import {AfterViewInit, Component, ElementRef, Input, Output} from "@angular/core";
import { Router  } from "@angular/router";
import {UserService} from "../services/user.service";
import {DialogComponent}from './dialog.component';
import {FormBuilder} from "@angular/forms";
import {FormGroup} from "@angular/forms/src/model";
import {Unit} from "../models/unit.model";
import {UnitService} from "../services/units.service";



@Component({
  selector: 'uniteditdialog',
  templateUrl:  './uniteditdialog.component.html',
})
export class UnitEditDialogComponent extends DialogComponent {
  unitBasicForm: FormGroup;
  unitAlertForm: FormGroup;
  unitNetworkForm: FormGroup;
  isSubmitting = false;

  @Input()
  selectedUnit: Unit;

  @Input()
  modifyType: number;

  constructor(
    private fb: FormBuilder,
    private unitService: UnitService
  ){
    super();
    this.unitBasicForm = this.fb.group({
      towerfrom: '',
      towerto: '',
      idintower: "",
      phonenum: "",
      identity:"",
      location:""
    });

    this.unitAlertForm = this.fb.group({
      alertdistance1: '',
      alertdistance2: '',
      alertdistance3: "",
      picresolution:"",
      picenable: false,
      piclightenhance: false,
      beep: false,
      highsensitivity: false
    });

    this.unitNetworkForm = this.fb.group({
      serverip:"",
      serverport:""
    });


  }

  patchValue(unit: Unit) {
    this.unitBasicForm.patchValue(unit);
    if (unit.alertsettings != undefined) {
      this.unitAlertForm.patchValue(unit.alertsettings);
      this.unitNetworkForm.patchValue(unit.networksettings);
    }

  }

  updateUnit(target: Object, values: Object){
    (<any>Object).assign(target, values);

  }

  updateValue(unit: Unit) {
    this.updateUnit(unit, this.unitBasicForm.value);
    this.updateUnit(unit.alertsettings, this.unitAlertForm.value);
    this.updateUnit(unit.networksettings, this.unitNetworkForm.value);
  }


  submitModify(unit: Unit) {
    this.isSubmitting = true;
    this.updateValue(unit);
    this.unitService.save(unit)
      .subscribe(
        unit => {
          this.hide();
          this.isSubmitting = false;
        },
        err => {
          this.errors = err;
          this.isSubmitting = false;
        });

  }


}
