/**
 * Created by zezhang on 2017/4/27.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ReportListConfig, TagsService, UserService } from '../shared';


@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls:  ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService,
  ) {}

  isAuthenticated: boolean;
  listConfig: ReportListConfig = new ReportListConfig();
  tags: Array<string> = [];

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        if (authenticated) {
          this.setListTo('report');
        }
      });


  }


  setListTo(type: string = '', filter: Object = {}) {
    if (!this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.listConfig= {type: type, filters: filter};
  }
}
