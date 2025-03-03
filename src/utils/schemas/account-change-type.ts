import mongoose, { Document, Model, Schema } from 'mongoose';

export interface AccountChangeType extends Document {
  name: string
  color: string
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
    console.log(count)
  }
}


const AccountChangeType: Model<AccountChangeType> = mongoose.models.AccountChangeType || mongoose.model<AccountChangeType>('AccountChangeType', AccountChangeTypeSchema);

export default AccountChangeType;
