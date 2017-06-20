import { Pipe, PipeTransform } from '@angular/core';
import {Unit} from "../models/unit.model";

@Pipe({
  name: 'unittypestr',
  pure: false
})
export class UnitTypeStrFilterPipe implements PipeTransform {
  transform(item: number): any {
    switch(item) {
      case 0:
        return 'City';
      case 1:
        return 'Line';
      case 2:
        return 'Unit';
      default:
        return 'Unit';
    }

  }
}
