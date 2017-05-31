/**
 * Created by zezhang on 2017/5/8.
 */



import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
import {User} from "../models/";

@Injectable()
export class ProfilesService {
  constructor(
    private apiService: ApiService
  ){}

  get() : Observable<User>  {
      return this.apiService.get('/user/')
        .map((data: {user: User}) => data.user);
  }

  follow(username: string)  : Observable<User> {
      return  this.apiService.post('/profiles/' + username + '/follow');
  }

  unfollow(username: string) : Observable<User> {
    return this.apiService.delete('/profiles/' + username + '/follow');
  }
}
