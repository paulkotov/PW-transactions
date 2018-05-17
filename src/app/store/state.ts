import { User } from '../models/user';
import { Transaction } from '../models/transaction';

export interface AppState {
    isAuthenticated: boolean;
    user: User;
    transactions: Array<Transaction>;
}