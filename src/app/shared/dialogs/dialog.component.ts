/**
 * Created by zezhang on 2017/5/8.
 */


import {AfterViewInit, Component, ElementRef, Input, Output} from "@angular/core";
import { Router  } from "@angular/router";
import {UserService} from "../services/user.service";


@Component({
  selector: 'dialog',
  templateUrl:  './dialog.component.html',
  styles: [`
    .modal {
      background: rgba(0,0,0,0.6);
    }
   .modal-dialog{
    overflow-y: initial !important
    }
  .modal-body{
    height: 300px;
    overflow-y: auto;
  }`]
})
export class DialogComponent {

  constructor() {}

  errors: Object = {};

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

}
