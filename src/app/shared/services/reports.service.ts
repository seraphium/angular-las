/**
 * Created by zezhang on 2017/5/8.
 */

import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
import {Report, DeviceReport} from "../models";
import {ReportListConfig} from "../models/report-list-config.model";
import {URLSearchParams} from '@angular/http';

@Injectable()
export class ReportService  {
  constructor(
    private apiService: ApiService
  ){}

  query(config: ReportListConfig): Observable<{report: Report[], reportCount: number}>  {
      let params: URLSearchParams =  new URLSearchParams();
      Object.keys(config.filters).forEach(
        (key) => {
          params.set(key, config.filters[key]);
        }
      );

      return this.apiService.get('/reports', params)
      .map(data => data);

  }

  querydevicereports(config: ReportListConfig): Observable<{devicereport: DeviceReport[], deviceReportsCount: number}>  {
    let params: URLSearchParams =  new URLSearchParams();
    Object.keys(config.filters).forEach(
      (key) => {
        params.set(key, config.filters[key]);
      }
    );

    return this.apiService.get('/devicereports', params)
      .map(data => data);

  }

  get(id): Observable<Report> {
    let params: URLSearchParams =  new URLSearchParams();
    params.set('id', id);
    return this.apiService.get('/reports/', params)
        .map(data => data.units);
  }

  getall(): Observable<{report: Report[], reportsCount: number}> {
    return this.apiService.get('/reports/')
      .map(data => data);
  }

  getdevicereports(id): Observable<DeviceReport> {
    let params: URLSearchParams =  new URLSearchParams();
    params.set('id', id);
    return this.apiService.get('/devicereports/', params)
      .map(data => data.units);
  }

  getalldevicereports(): Observable<{report: DeviceReport[], reportsCount: number}> {
    return this.apiService.get('/devicereports/')
      .map(data => data);
  }

  save(report): Observable<Report>  {
      //if we're updating an existing article
      if (report.id) {
        return this.apiService.post('/report/'+ report.id + '/', {report: report})
          .map(data => {
            console.log('update report:' + data);
            return data;
          });
      } else {
        return this.apiService.post('/report/' + report.id + '/', {report: report})
          .map(data => data);
      }
  }

  destroy(id) {
      return this.apiService.delete('/report/' + id + '/');
  }

}
