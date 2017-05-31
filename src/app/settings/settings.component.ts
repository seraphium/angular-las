/**
 * Created by zezhang on 2017/5/8.
 */



import {Component, OnInit} from "@angular/core";
import {User} from "../shared/models/user.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../shared/services/user.service";
import {Errors} from "../shared/models/errors.model";


@Component({
  selector: 'settings-page',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit{
  user: User = new User();
  settingsForm:  FormGroup;
  errors: Errors = new Errors();
  isSubmitting: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder

  ){

    this.settingsForm = this.fb.group({
      name:'',
      phonenum:'',
      dept: '',
      line:'',
      password:'',
      password2:''
    })
  }

  ngOnInit(){
    (<any>Object).assign(this.user, this.userService.getCurrentUser());
    this.settingsForm.patchValue(this.user);
  }

  logout(){
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  updateUser(values: Object){
    (<any>Object).assign(this.user, values);
  }

  submitForm(){
    this.errors = new Errors();

    if (this.settingsForm.value.password != this.settingsForm.value.password2){
      this.errors = {'errors':{'Password': 'not match'}};
      return;
    }
    this.isSubmitting = true;
    let value = this.settingsForm.value;
    if (value.password === null|| value.password === "") {
      delete value["password"];
    }
    delete value["password2"];
    this.updateUser(value);

    this.userService
      .update(this.user)
      .subscribe(
        updatedUser => {
          this.router.navigateByUrl('/profile/' + updatedUser.name)
        },
        err => {
          this.errors = err;
          this.isSubmitting = false;
        });
  }

}
