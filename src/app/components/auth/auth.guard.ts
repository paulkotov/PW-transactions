import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, Route } from '@angular/router';

import { UserService } from './../../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private userService: UserService) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.userService.isLoggedIn().subscribe((data: any) => {
      return true;
    }, error=>{
      this.router.navigate(['/login']);
    });
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  // canLoad(route: Route) {
  //   if (this.userService.isLoggedIn()) {
  //     console.log(this.userService.isLoggedIn());
  //     return true;
  //   } else {
  //     this.router.navigate(['/login']);
  //   }
  // }

}
