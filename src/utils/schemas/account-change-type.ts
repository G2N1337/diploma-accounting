import mongoose, { Model, Schema } from 'mongoose';

export interface AccountChangeType {
  name: string
  color: string
  _id: string
}

export enum AccountChangeTypeEnum {
  Income = 'Пополнение',
  Expense = 'Расходы',
}

const AccountChangeTypeSchema: Schema<AccountChangeType> = new mongoose.Schema({
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

AccountChangeTypeSchema.statics.initializeDefaults = async function initializeDefaults() {
  const count = await this.countDocuments();
  if (count === 0) {
    await this.insertMany([
      { name: AccountChangeTypeEnum.Income, color: 'green' },
      { name: AccountChangeTypeEnum.Expense, color: 'red' },
    ]);
    console.log('Added: ', count, ' items')
  }
}


const AccountChangeType: Model<AccountChangeType> = mongoose.models.AccountChangeType || mongoose.model<AccountChangeType>('AccountChangeType', AccountChangeTypeSchema);

export default AccountChangeType;
