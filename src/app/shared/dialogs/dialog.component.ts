/**
 * Created by zezhang on 2017/5/8.
 */


import {AfterViewInit, Component, ElementRef, Input, Output} from "@angular/core";
import { Router  } from "@angular/router";
import {UserService} from "../services/user.service";


@Component({
  selector: 'show-dialog',
  templateUrl:  './dialog.component.html',
  styles: [`
    .modal {
      background: rgba(0,0,0,0.6);
    }
  `]
})
export class ShowDialogComponent {

  constructor() {}

  public visible = false;
  public visibleAnimate = false;

  show() {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  hide() {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

  //@Input()
  //profile: Profile;

  //@Output()
 // onToggle = new EventEmitter<boolean>();

 // isSubmitting = false;

  /*
  toggleFollowing() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return;
        }

        if(!this.profile.following) {
          this.profileService.follow(this.profile.username)
            .subscribe(
              data => {
                this.isSubmitting = false;
                this.onToggle.emit(true);
              },
              err => this.isSubmitting = false
            );
        } else {

          this.profileService.unfollow(this.profile.username)
            .subscribe(
              data => {
                this.isSubmitting = false;
                this.onToggle.emit(false);
              },
              err => this.isSubmitting = false
            );


        }
      }
    )
  }*/
}
