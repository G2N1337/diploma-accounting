import mongoose, { Model, Schema } from 'mongoose';
import { ExpenseCategoriesType } from './expense-categories';
import { AccountChangeInterface } from './account-change-type';

export interface AccountPosition {
  category: ExpenseCategoriesType;
  type: AccountChangeInterface;
  user: typeof mongoose.Schema.ObjectId
  wallet: typeof mongoose.Schema.ObjectId
  amount: number
  comment: string
  date: Date
  _id: string
}

const AccountPositionSchema: Schema<AccountPosition> = new mongoose.Schema({
  category: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'ExpenseCategories'
  },
  wallet: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Wallet'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User'
  },
  type: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'AccountChangeType'
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  comment: {
    type: String,
    default: '',
  }
});

const AccountPosition: Model<AccountPosition> = mongoose.models.AccountPosition || mongoose.model<AccountPosition>('AccountPosition', AccountPositionSchema);

export default AccountPosition;
