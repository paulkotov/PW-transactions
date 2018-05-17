import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';

import { AppState } from '../../store/state';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [UserService]
})
export class AuthComponent implements OnInit {
  registerNew : boolean = true;
  user: User=new User();

  constructor(private userService: UserService, private router: Router) { 
    this.user.name = '';
    this.user.email = '';
    this.user.password = '';
  }

  submit(user: User){
    this.registerNew ? this.userService.registerUser(user) : this.userService.login(user);
    this.userService.isLoggedIn() ? this.router.navigate(['']) : this.router.navigate(['login']);
    
      // this.isLoggedIn ? this.router.navigate(['']) : this.router.navigate(['login']);
      
      // .subscribe(
      //   (data: any) => {
      //     console.log(data);
      //     window.localStorage.setItem('user_name', user.name);
      //     window.localStorage.setItem('user_token', data.id_token);
      // }, 
      //   error => {
      //     console.log(error)
      //   })
  }
  
  IsRegFormInCorrect(){
    return (this.user.name == '' || this.user.email == '' || this.user.password == '');
  }

  IsLoginFormInCorrect(){
    return (this.user.email == '' || this.user.password == '');
  }

  change(){
    this.registerNew = !this.registerNew;
  }

  ngOnInit() {
  }

}
