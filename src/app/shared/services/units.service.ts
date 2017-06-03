/**
 * Created by zezhang on 2017/5/8.
 */

import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
import {Unit} from "../models/unit.model";
import {UnitListConfig} from "../models/unit-list-config.model";
import {URLSearchParams} from '@angular/http';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class UnitService  {
  constructor(
    private apiService: ApiService
  ){}

  public selectedUnitSubject = new BehaviorSubject<Unit>(new Unit());
  public selectedUnit = this.selectedUnitSubject.asObservable().distinctUntilChanged();


  public unitsSubject = new BehaviorSubject<Unit>(new Unit());
  public units = this.unitsSubject.asObservable().distinctUntilChanged();

  query(config: UnitListConfig): Observable<{units: Unit[], unitsCount: number}>  {
      let params: URLSearchParams =  new URLSearchParams();
      Object.keys(config.filters).forEach(
        (key) => {
          params.set(key, config.filters[key]);
        }
      );

      return this.apiService.get('/units', params)
      .map(data => data);

  }

  get(id): Observable<Unit> {
    let params: URLSearchParams =  new URLSearchParams();
    params.set('id', id);
    return this.apiService.get('/units/', params)
        .map(data => data.units);
  }

  getall(): Observable<{units: Unit[], unitsCount: number}> {
    return this.apiService.get('/units/')
      .map(data => {
        this.unitsSubject.next(data.units);
       return data;
      });
  }

  save(unit): Observable<Unit>  {
      //if we're updating an existing article
      if (unit.id) {
        return this.apiService.put('/units/'+ unit.id, {unit: unit})
          .map(data => data.unit);
      } else {
        return this.apiService.post('/units/', {unit: unit})
          .map(data => data.unit);
      }
  }

  destroy(id) {
      return this.apiService.delete('/units/' + id);
  }

}
