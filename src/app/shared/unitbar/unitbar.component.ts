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
import {ShowDialogComponent} from "../dialogs/dialog.component";
import {TreeComponent} from 'angular-tree-component';
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

  @ViewChild(ShowDialogComponent)
  public readonly _modal: ShowDialogComponent;

  @ViewChild(TreeComponent)
  public readonly _tree: TreeComponent;

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

  ngOnInit()
  {

    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
       // this.canModify = (this.currentUser.name === this.article.author.username);
      }
    );

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

  unitClicked(unit: Unit) {
      console.log("clicked" + unit.type + "id:" + unit.id);
      this.unitService.selectedUnitSubject.next(unit);
  }

  addUnit(unit: Unit){
    console.log('add unit from line:' + unit.name)
    this._modal.show();
  }

  addCity(){
    console.log('add city');
    this._modal.show();
  }

  searchChange(searchText){
    console.log("Search:" + searchText);
    this._tree.treeModel.filterNodes((node) => {
       let hide = (node.data.name.includes(searchText));
       return hide;
    }
    );
  }
 /* onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;

    if (favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }


  populateComments() {
      this.commentsService.getAll(this.article.slug)
        .subscribe(comments => {
          if (isUndefined(comments)){
            this.comments = new Array<Comment>();
          }  else {
            this.comments = comments;
          }
        });

  }

  addComment() {
      this.isSubmitting = true;
      this.commentFormErrors = {};

      let commentBody = this.commentControl.value;
      this.commentsService
        .add(this.article.slug, commentBody)
        .subscribe(
          comment => {
            this.comments.unshift(comment);
            this.commentControl.reset('');
            this.isSubmitting = false;
          },
          errors => {
            this.isSubmitting = false;
            this.commentFormErrors = errors;
          }
        )
  }

  onDeleteComment(comment){
      this.commentsService.destroy(comment.id, this.article.slug)
        .subscribe(
          success => {
            this.comments = this.comments.filter((item) => item !== comment);
          }
        )
  }*/

}
