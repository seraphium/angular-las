/**
 * Created by zezhang on 2017/5/8.
 */

import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
import {Report} from "../models/report.model";
import {ReportListConfig} from "../models/report-list-config.model";
import {URLSearchParams} from '@angular/http';

@Injectable()
export class ReportService  {
  constructor(
    private apiService: ApiService
  ){}

  query(config: ReportListConfig): Observable<{units: Report[], unitsCount: number}>  {
      let params: URLSearchParams =  new URLSearchParams();
      Object.keys(config.filters).forEach(
        (key) => {
          params.set(key, config.filters[key]);
        }
      );

      return this.apiService.get('/reports', params)
      .map(data => data);

  }

  get(id): Observable<Report> {
    let params: URLSearchParams =  new URLSearchParams();
    params.set('id', id);
    return this.apiService.get('/reports/', params)
        .map(data => data.units);
  }

  getall(): Observable<{units: Report[], unitsCount: number}> {
    return this.apiService.get('/reports/')
      .map(data => data);
  }

  save(report): Observable<Report>  {
      //if we're updating an existing article
      if (report.id) {
        return this.apiService.put('/reports/'+ report.id, {report: report})
          .map(data => data.unit);
      } else {
        return this.apiService.post('/reports/', {report: report})
          .map(data => data.unit);
      }
  }

  destroy(id) {
      return this.apiService.delete('/reports/' + id);
  }

}
