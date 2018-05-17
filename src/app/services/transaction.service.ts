import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { Config } from '../config/config';
import { Transaction } from '../models/transaction';
import { AppState } from '../store/state';
import * as actions  from '../store/actions';
import * as fromApp from '../store/reducers/reducer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TransactionService {
  public transactions$: Observable<Transaction[]>

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.transactions$ = this.store.select(fromApp.getTransactions);
   }

  createTransaction(token: string, transaction: Transaction) {
    const Header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {name: transaction.recepient, ammount: transaction.ammount};
    return this.http.post(`http://${Config.url}:${Config.port}/api/protected/transactions`, body, {headers: Header});
  }

  transactionsInfo(token: string){
    const Header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`http://${Config.url}:${Config.port}/api/protected/transactions`, {headers: Header});
  }
  
  // getTransactions(){
  //   return this.store.select(fromApp.getTransactions);
  // }
}
