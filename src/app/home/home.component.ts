/**
 * Created by zezhang on 2017/4/27.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ReportListConfig, TagsService, UserService } from '../shared';
import {UnitService} from "../shared/services/units.service";
import {Unit} from "../shared/models/unit.model";


@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls:  ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService,
    private unitService: UnitService
  ) {}

  isAuthenticated: boolean;
  listConfig: ReportListConfig = new ReportListConfig();
  tags: Array<string> = [];

  selectedUnit: Unit = new Unit();

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        if (authenticated) {
          this.setListTo('report');
        } else {
          this.router.navigateByUrl('/login');
        }
      });

    this.unitService.selectedUnit.subscribe(unit => {
      this.selectedUnit = unit;
    })

  }



  setListTo(type: string = '', filter: Object = {}) {
    if (!this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.listConfig= {type: type, filters: filter};
  }
}
