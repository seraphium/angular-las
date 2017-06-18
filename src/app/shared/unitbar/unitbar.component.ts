/**
 * Created by zezhang on 2017/5/9.
 */

import {Component, OnInit, ViewChild} from "@angular/core";
import {Unit} from "../models/unit.model";
import {User} from "../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UnitService} from "../services/units.service";
import {UserService} from "../services/user.service";
import {isUndefined} from "util";
import {TreeComponent} from 'angular-tree-component';
import {UnitEditDialogComponent, CityLineDialogComponent} from "../dialogs/";
declare var $:any;

@Component({
  selector: 'unitbar',
  templateUrl: './unitbar.component.html',
})
export class UnitbarComponent implements OnInit {
  units: Array<Unit>;
  unitroots: Array<Unit>;
  currentUser: User;
  canModify: boolean;
  isSubmitting = false;
  isDeleting = false;

  @ViewChild(TreeComponent)
  public readonly _tree: TreeComponent;

  @ViewChild("unitedit")
  public readonly _unitModal: UnitEditDialogComponent;

  @ViewChild("cityline")
  public readonly _citylineModal: CityLineDialogComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unitService:  UnitService,
    private userService: UserService
  ){


  }

  getChildren(unit:Unit) : Array<Unit> {
     return this.units.filter(u => {
        return u.parent === unit.id;
      });
  }

  buildUnitTree(){
      for (let unit of this.units){
        unit.children = this.getChildren(unit)
      }
  }

  updateUnit(){
    this.unitService.getall().subscribe(units => {
      if (isUndefined(units)){
        this.units = new Array<Unit>();
      } else {
        this.units = units.units;
        this.buildUnitTree();
        this.unitroots = this.units.filter( u=> u.type === 0);
        if (this.units.length > 0) {
          this.unitService.selectedUnitSubject.next(this.units[0]);

        }
      }
    });
  }
  ngOnInit()
  {

    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
       // this.canModify = (this.currentUser.name === this.article.author.username);
      }
    );
    this.updateUnit();


  }

  unitClicked(unit: Unit) {
      console.log("clicked" + unit.type + "id:" + unit.id);
      this.unitService.selectedUnitSubject.next(unit);
  }

  addUnit(unit: Unit){
    if (unit.type === 0){
      this.addLine(unit)

    } else {
      console.log('add unit from line:' + unit.name);
      this._unitModal.selectedUnit = new Unit();
      this._unitModal.selectedUnit.operators = [this.userService.getCurrentUser().id];
      this._unitModal.selectedUnit.parent = unit.id;
      this._unitModal.isNewUnit = true;
      this._unitModal.show(2);
    }

  }

  omSubmitted(result: boolean){
    if (result) {
      this.updateUnit();

    }
  }

  addCity(){
    this._citylineModal.selectedUnit = new Unit();
    this._citylineModal.selectedUnit.type = 0;
    this._citylineModal.selectedUnit.operators = [this.userService.getCurrentUser().id];
    this._citylineModal.isNewUnit = true;
    this._citylineModal.show(0);
  }

  addLine(unit: Unit){
    this._citylineModal.selectedUnit = new Unit();
    this._citylineModal.selectedUnit.type = 1;
    this._citylineModal.selectedUnit.parent = unit.id;
    this._citylineModal.selectedUnit.operators = [this.userService.getCurrentUser().id];
    this._citylineModal.isNewUnit = true;
    this._citylineModal.show(1);
  }

  searchChange(searchText){
    console.log("Search:" + searchText);
    this._tree.treeModel.filterNodes((node) => {
       let unit = node.data;
       let show = (unit.name.includes(searchText)) || (unit.phonenum.includes(searchText));
       return show;
    }
    );
  }


}
