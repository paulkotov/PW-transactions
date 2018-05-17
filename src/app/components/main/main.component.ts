import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user';
import { Transaction } from '../../models/transaction'
import { UserService } from '../../services/user.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: []
})
export class MainComponent implements OnInit {
  public user$: Observable<User>;
  public transactions$: Observable<Transaction[]>;

  constructor(private userService: UserService, private transactionService: TransactionService) {
    this.user$ = this.userService.user$;
    this.transactions$ = this.transactionService.transactions$;
  }
  
  ngOnInit() {  }

}
