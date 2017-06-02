/**
 * Created by zezhang on 2017/5/9.
 */
import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import {ReportService} from "../shared/services/reports.service";
import {Report} from "../shared/models/report.model";

@Injectable()
export class ReportResolver implements Resolve<Report> {
  constructor(
    private router: Router,
    private reportService: ReportService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<any> {
      return this.reportService.get(route.params['id'])
        .catch((err) => this.router.navigateByUrl('/'));

  }
}
