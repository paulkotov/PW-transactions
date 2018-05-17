import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { Config } from '../config/config';
import { User } from '../models/user';
import { AppState } from '../store/state';
import * as actions  from '../store/actions';
import * as fromApp from '../store/reducers/reducer';

@Injectable()
export class UserService {
  public user$: Observable<User>;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.user$ = this.store.select(fromApp.getUser);
   }

  registerUser(user: User): void {
    const body = {username: user.name, password: user.password, email: user.email};
    // return this.http.post(`http://${Config.url}:${Config.port}/users`, body);
    this.http.post(`http://${Config.url}:${Config.port}/users`, body).subscribe( (data: any) => {
      let usr = {
        name: user.name,
        password: user.password,
        email: user.email,
        token:  data.id_token,
        balance: 500
      }
      console.log(data);
      this.store.dispatch(new actions.SaveUser(usr));
      }, error => {
        console.log(error);
      }
    );
  }

  login(user: User): void {
    const body = { email: user.email, password: user.password };
    // return this.http.post(`http://${Config.url}:${Config.port}/sessions/create`, body);
    this.http.post(`http://${Config.url}:${Config.port}/sessions/create`, body).subscribe( (data: any) => {
      let usr = {
        name: '',
        password: user.password,
        email: user.email,
        token:  data.id_token,
        balance: 500
      };
      this.userInfo(data.id_token).subscribe( (data: any) => {
        usr.name = data.user_info_token.name;
        this.store.dispatch(new actions.SaveUser(usr));
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

  logout(): void {
      this.store.dispatch(new actions.DelUser());
  }

  userInfo(token: string){
    const Header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {};
    return this.http.get(`http://${Config.url}:${Config.port}/api/protected/user-info`, {headers: Header})
  }

  filteredUserList(filter: string) {
    const Header = new HttpHeaders().set('Authorization', 'Bearer ${token}');
    const body = {filter: filter}
    return this.http.post(`http://${Config.url}:${Config.port}/users`, body, {headers: Header});
  }

  isLoggedIn() {
    return this.store.select(fromApp.getIsAuth).pipe(take(1));
  }

  getCurrentUser(){
    return this.store.select(fromApp.getUser);
  }

}
