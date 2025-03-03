import mongoose, { Document, Model, Schema } from 'mongoose';
import { AccountChangeType } from './account-change-type';

export interface AccountChange extends Document {
  type: AccountChangeType | mongoose.Types.ObjectId;
  amount: number
  date: Date
}

const AccountChangeSchema: Schema<AccountChange> = new mongoose.Schema({
  type: {
    type: Schema.Types.ObjectId,
    ref: 'AccountChangeType',
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
});

const AccountChange: Model<AccountChange> = mongoose.models.AccountChange || mongoose.model<AccountChange>('AccountChange', AccountChangeSchema);

export default AccountChange;
