/**
 * Created by zezhang on 2017/5/9.
 */

import {Component, Input, OnInit} from "@angular/core";
import {Report, DeviceReport} from "../shared/models";
import {User} from "../shared/models/user.model";
import {Unit} from '../shared/models/unit.model';
import {ActivatedRoute, Router} from "@angular/router";
import {ReportService} from "../shared/services/reports.service";
import {UserService} from "../shared/services/user.service";
import {FormControl} from "@angular/forms";
import {isUndefined} from "util";
import {ReportListConfig} from "../shared/models/report-list-config.model";
import {UnitbarComponent} from "../shared/unitbar/unitbar.component";
import {UnitService} from "../shared/services/units.service";

declare var $:any;

@Component({
  selector: 'reportlist',
  templateUrl: './report.component.html'
})
export class ReportComponent implements OnInit {
  reports: Array<Report>;
  devicereports: Array<DeviceReport>;
  currentUser: User;
  canModify: boolean;
  isSubmitting = false;
  isDeleting = false;
  selectedUnit: Unit;
  isReportLoading = false;
  isDeviceReportLoading = false;

  private _type: string;
  @Input() set type(newtype: string){
    if (this._type != newtype){
      this._type = newtype;
      console.log("type set to " + this._type);
    }
  }

  get type(): string {
    return this._type;
  }

  constructor(
    private route: ActivatedRoute,
    private reportService:  ReportService,
    private router: Router,
    private userService: UserService,
    private unitService: UnitService
  ){

  }

  ngOnInit()
  {

    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
       // this.canModify = (this.currentUser.name === this.article.author.username);
      }
    );

    this.unitService.selectedUnit.subscribe(unit => {
      this.selectedUnit = unit;
      console.log("report selected unit:" + unit.id);
      let queryConfig = new ReportListConfig();
      queryConfig.filters.unit_id = unit.id;
      this.isReportLoading = true;
      this.reportService.query(queryConfig).subscribe(reports => {
        if (isUndefined(reports)){
          this.reports = new Array<Report>();
          this.isReportLoading = false;
        } else {
          this.reports = reports.report;
          this.isReportLoading = false;
        }
      });


      queryConfig.type = 'devicereports';
      queryConfig.filters.unit_id = unit.id;
      this.isDeviceReportLoading = true;
      this.reportService.querydevicereports(queryConfig).subscribe(devicereports => {
        if (isUndefined(devicereports)){
          this.devicereports = new Array<DeviceReport>();
          this.isDeviceReportLoading = false;

        } else {
          this.isDeviceReportLoading = false;
        }
      })
    })

  }

  showMedia(report: Report) {
    $('#mediaModal').modal('show');

  }

  disalarm(report: Report){
    $('#disalarmModal').modal('show');

  }

}
