import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css'],
  providers: []
})
export class UserPanelComponent implements OnInit {
  @Input() 
  user: User;

  constructor(private router: Router) {
  }

  logout(){
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
