/**
 * Created by zezhang on 2017/5/9.
 */

import {Component, OnInit} from "@angular/core";
import {Unit} from "../models/unit.model";
import {User} from "../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UnitService} from "../services/units.service";
import {UserService} from "../services/user.service";
import {isUndefined} from "util";


@Component({
  selector: 'unitbar',
  templateUrl: './unitbar.component.html'
})
export class UnitbarComponent implements OnInit {
  units: Array<Unit>;
  currentUser: User;
  canModify: boolean;
  isSubmitting = false;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unitService:  UnitService,
    private userService: UserService
  ){

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
