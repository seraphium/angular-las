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
    private userService: UserService
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
 }


}
