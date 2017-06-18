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
  selector: 'citylinedialog',
  templateUrl:  './citylinedialog.component.html',
  styles:  [`    
    modal{
      overflow-y: initial !important
    }
    modal-body{
      height: 300px;
      overflow-y: auto;
    }`]
})
export class CityLineDialogComponent {
  citylineForm: FormGroup;

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

    this.citylineForm = this.fb.group({
      name:"",
      voltage:""
    });


    this.modifyType = 0;
  }

  patchValue(unit: Unit) {

    this.citylineForm.patchValue(unit);

  }

  updateUnit(target: Object, values: Object){
    (<any>Object).assign(target, values);

  }

  updateValue(unit: Unit) {
    this.updateUnit(unit, this.citylineForm.value);

  }


  submitModify(unit: Unit) {
    this.isSubmitting = true;
    this.updateValue(unit);
    unit.type = this.modifyType === 0?0:1;
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
