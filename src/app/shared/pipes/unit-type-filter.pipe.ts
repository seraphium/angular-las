import { Pipe, PipeTransform } from '@angular/core';
import {Unit} from "../models/unit.model";

@Pipe({
  name: 'unittype',
  pure: false
})
export class UnitTypeFilterPipe implements PipeTransform {
  transform(items: Unit[], value : number): any {
    if (!items) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter(item => item.type === value);
  }
}
