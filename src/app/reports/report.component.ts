/**
 * Created by zezhang on 2017/5/9.
 */

import {Component, Input, OnInit} from "@angular/core";
import {Report} from "../shared/models/report.model";
import {User} from "../shared/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ReportService} from "../shared/services/reports.service";
import {UserService} from "../shared/services/user.service";
import {FormControl} from "@angular/forms";
import {isUndefined} from "util";
import {ReportListConfig} from "../shared/models/report-list-config.model";


@Component({
  selector: 'reportlist',
  templateUrl: './report.component.html'
})
export class ReportComponent implements OnInit {
  reports: Array<Report>;
  currentUser: User;
  canModify: boolean;
  isSubmitting = false;
  isDeleting = false;

  @Input() type: string = 'report';

  constructor(
    private route: ActivatedRoute,
    private reportService:  ReportService,
    private router: Router,
    private userService: UserService
  ){

  }

  ngOnInit()
  {
    /*this.route.data.subscribe(
      (data: {article: Article}) => {
        this.article = data.article;

        this.populateComments();
      }
    );
*/
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
       // this.canModify = (this.currentUser.name === this.article.author.username);
      }
    );

    this.reportService.getall().subscribe(reports => {
      if (isUndefined(reports)){
        this.reports = new Array<Report>();
      } else {
        this.reports = reports.reports;
      }
    })

  }

  /*onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;

    if (favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }

  onToggleFollowing(following: boolean) {
      this.article.author.following = following;
  }

  deleteArticle() {
      this.isDeleting = true;
      this.articlesService.destroy(this.article.slug)
        .subscribe(
          success => {
            this.router.navigateByUrl('/');
          }
        )
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
  }
   */

}
