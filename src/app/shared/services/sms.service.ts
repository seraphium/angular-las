/**
 * Created by zezhang on 2017/5/8.
 */

import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
import {Sms} from "../models";

import {URLSearchParams} from '@angular/http';
import {SmsListConfig} from "../models/sms-list-config.model";

@Injectable()
export class SmsService  {
  constructor(
    private apiService: ApiService
  ){}

  query(config: SmsListConfig): Observable<{sms: Sms[], smsCount: number}>  {
      let params: URLSearchParams =  new URLSearchParams();
      Object.keys(config.filters).forEach(
        (key) => {
          params.set(key, config.filters[key]);
        }
      );

      return this.apiService.get('/sms', params)
      .map(data => data);

  }

  get(id): Observable<Sms> {
    let params: URLSearchParams =  new URLSearchParams();
    params.set('id', id);
    return this.apiService.get('/sms/', params)
        .map(data => data.units);
  }

  getall(): Observable<{sms: Sms[], smsCount: number}> {
    return this.apiService.get('/sms/')
      .map(data => data);
  }


  save(sms): Observable<Sms>  {
      //if we're updating an existing article
      if (sms.id) {
        return this.apiService.put('/sms/'+ sms.id, {sms: sms})
          .map(data => data.sms);
      } else {
        return this.apiService.post('/sms/', {sms: sms})
          .map(data => data.sms);
      }
  }


}
