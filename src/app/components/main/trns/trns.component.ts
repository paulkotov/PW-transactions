import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';

import { Transaction } from '../../../models/transaction';
import { User } from '../../../models/user';

interface SavedTransaction {
  transaction : Transaction;
  id: number;
  date: string;
}

@Component({
  selector: 'app-trns',
  templateUrl: './trns.component.html',
  styleUrls: ['./trns.component.css'],
  providers: [TransactionService]
})
export class TrnsComponent implements OnInit {
  @Input()
  transactionsHistory: Transaction[];

  user_token: string = null;
  user_balance: number;
  total: number = 0;
  transaction : Transaction =  new Transaction();
  transactions: SavedTransaction[] = new Array<SavedTransaction>();
  // transactionsHistory: Array<any> = [];

  private id: number = 0;
  private date: string = '';

  constructor(private transactionService: TransactionService) {
    const data = window.localStorage.getItem('user_token');
    if(data && data !== null ) { 
      this.user_token = data;
    }
    this.transaction.recepient = '';
    this.transaction.ammount = 0;
    this.user_balance = 500;
    // this.transactionsInfo();
  }

  isUserInSystem(){
    return this.user_token !== null;
  }

  saveTransaction(tr: Transaction){
    const token = window.localStorage.getItem('user_token');
    this.transactionService.createTransaction(token, tr)
    .subscribe(
      (data: any) => {
        this.transactions.push({
          transaction: tr,
          id: data.trans_token.id,
          date:  data.trans_token.date
        });
       },
       error => console.log(error)
    );
  }

  transactionsInfo(){
    const token = window.localStorage.getItem('user_token');
    this.transactionService.transactionsInfo(token)
    .subscribe( (data: any) => {
      this.transactionsHistory = data.trans_token;
      console.log(data);
    },
    error => console.log(error)
    );
  }

  addTransaction(t: any){
    const trns = new Transaction();
    trns.recepient = t.recepient;
    trns.ammount = t.ammount;
    this.saveTransaction(trns);
    this.total += t.ammount;
    this.user_balance -= t.ammount;
    this.transaction.recepient = '';
    this.transaction.ammount = 0;
  }

  ngOnInit() {
  }

}
