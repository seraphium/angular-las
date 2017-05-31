/**
 * Created by zezhang on 2017/5/8.
 */


import {Component, OnInit} from "@angular/core";
import {ActivatedRoute } from '@angular/router';
import {User, UserService }from '../shared';

@Component({
  selector: 'profile-page',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit  {

  constructor(
    private  route: ActivatedRoute,
    private userService: UserService
){}

    currentUser: User;
    isUser: boolean;

    ngOnInit(){
      this.route.data.subscribe(
        (data: {user: User}) => {
          this.currentUser = data.user;
        }
      );

      this.userService.currentUser.subscribe(
        (userData: User) => {
          this.currentUser = userData;
          this.isUser = (this.currentUser.name === this.currentUser.name);
        }
      )
    }

    onToggleFollowing(following: boolean) {
      //this.profile.following = following;

    }

}
