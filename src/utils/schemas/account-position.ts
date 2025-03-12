import mongoose, { Document, Model, Schema } from 'mongoose';
import { AccountChangeTypeEnum } from '../enums/account-change-type';

export interface AccountPosition extends Document {
  type: AccountChangeTypeEnum;
  amount: number
  comment: string
  category: string
  date: Date
  user: typeof mongoose.Schema.ObjectId
}

const AccountPositionSchema: Schema<AccountPosition> = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User'
  },
  type: {
    type: String,
    enum: Object.values(AccountChangeTypeEnum),
    required: true,
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
