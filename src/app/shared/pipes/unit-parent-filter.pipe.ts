import { Pipe, PipeTransform } from '@angular/core';
import {Unit} from "../models/unit.model";

@Pipe({
  name: 'unitparent',
  pure: false
})
export class UnitParentFilterPipe implements PipeTransform {
  transform(items: Unit[], value : object): any {
    if (!items) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter(item => item.parent === value);
  }
}
