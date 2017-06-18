/**
 * Created by jackiezhang on 2017/6/12.
 */

import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import { Router  } from "@angular/router";
import {UserService} from "../services/user.service";
import {FormBuilder} from "@angular/forms";
import {FormGroup} from "@angular/forms/src/model";
import {Unit, UnitAlertSettings, UnitNetworkSettings} from "../models/unit.model";
import {UnitService} from "../services/units.service";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {noUndefined} from "@angular/compiler/src/util";



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
  unitCameraForm: FormGroup;
  unitNetworkForm: FormGroup;

  isNewUnit = false;

  isSubmitting = false;

  errors: Object = {};

  @Input()
  selectedUnit: Unit;

  @Input()
  modifyType: number;

  @Output()
  submitEvent: EventEmitter<boolean> = new EventEmitter();

  @ViewChild(ModalComponent)
  private readonly _modal: ModalComponent;

  constructor(
    private fb: FormBuilder,
    private unitService: UnitService,
    private userService: UserService
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

    this.unitCameraForm = this.fb.group({
      camera1mode: "",
      camera1videoduration:"",
      camera1videoframerate:"",
      camera1mediainterval:"",
      camera2mode: "",
      camera2videoduration:"",
      camera2videoframerate:"",
      camera2mediainterval:"",
      camera3mode: "",
      camera3videoduration:"",
      camera3videoframerate:"",
      camera3mediainterval:"",
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
      this.unitCameraForm.patchValue(unit.alertsettings);
      this.unitNetworkForm.patchValue(unit.networksettings);
    }

  }

  updateUnit(target: Object, values: Object){
    (<any>Object).assign(target, values);

  }

  updateValue(unit: Unit) {
    this.updateUnit(unit, this.unitBasicForm.value);
    if (unit.alertsettings === undefined){
      unit.alertsettings = new UnitAlertSettings();
    }
    this.updateUnit(unit.alertsettings, this.unitAlertForm.value);
    this.updateUnit(unit.alertsettings, this.unitCameraForm.value);

    if (unit.networksettings === undefined) {
      unit.networksettings = new UnitNetworkSettings();
    }
    this.updateUnit(unit.networksettings, this.unitNetworkForm.value);
  }

  setModifyType(type: number){
    this.modifyType = type;
  }


  submitModify(unit: Unit) {
    this.isSubmitting = true;
    this.updateValue(unit);
    unit.name = `#${unit.towerfrom}-#${unit.towerto}-${unit.idintower}`;
    unit.type = 2;
    unit.alertsettings.mode = 255;
    this.unitService.save(unit)
      .subscribe(
        unit => {
          this._modal.close();
          this.isSubmitting = false;
          this.submitEvent.emit(true);
        },
        err => {
          this.errors = err;
          this.isSubmitting = false;
          this.submitEvent.emit(false);

        });

  }

  show(type: number = 0){
      this.modifyType = type;
      this._modal.open();
  }
}
