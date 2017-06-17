/**
 * Created by jackiezhang on 2017/6/12.
 */

import {AfterViewInit, Component, ElementRef, Input, Output, ViewChild} from "@angular/core";
import { Router  } from "@angular/router";
import {UserService} from "../services/user.service";
import {FormBuilder} from "@angular/forms";
import {FormGroup} from "@angular/forms/src/model";
import {Unit} from "../models/unit.model";
import {UnitService} from "../services/units.service";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";



@Component({
  selector: 'uniteditdialog',
  templateUrl:  './uniteditdialog.component.html',
  styles:  [`    
    modal{
      overflow-y: initial !important
    }
    modal-body{
      height: 300px;
      overflow-y: auto;
    }`]
})
export class UnitEditDialogComponent {
  unitBasicForm: FormGroup;
  unitAlertForm: FormGroup;
  unitNetworkForm: FormGroup;
  isSubmitting = false;

  errors: Object = {};

  @Input()
  selectedUnit: Unit;

  @Input()
  modifyType: number;

  @ViewChild(ModalComponent)
  private readonly _modal: ModalComponent;

  constructor(
    private fb: FormBuilder,
    private unitService: UnitService
  ){

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

    this.modifyType = 0;
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

  setModifyType(type: number){
    this.modifyType = type;
  }


  submitModify(unit: Unit) {
    this.isSubmitting = true;
    this.updateValue(unit);
    this.unitService.save(unit)
      .subscribe(
        unit => {
          this._modal.close();
          this.isSubmitting = false;
        },
        err => {
          this.errors = err;
          this.isSubmitting = false;
        });

  }

  show(){
      this._modal.open();
  }
}
