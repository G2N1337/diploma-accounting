import * as mongoose from 'mongoose';
import { AccountChangeTypeEnum } from '../enums/account-change-type';

export interface AccountChangeInterface {
  name: string
  color: string
  _id: string
}

const AccountChangeTypeSchema: mongoose.Schema<AccountChangeInterface> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: Object.values(AccountChangeTypeEnum),
    unique: true,
  },
  color: {
    type: String,
    required: true,
  }
});
const AccountChangeType: mongoose.Model<AccountChangeInterface> = mongoose.models.AccountChangeType || mongoose.model('AccountChangeType', AccountChangeTypeSchema);

export default AccountChangeType;
