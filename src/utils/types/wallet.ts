import * as mongoose from 'mongoose'

export type WalletType = {
  user: typeof mongoose.Schema.ObjectId;
  balance: number;
  name: string;
  _id: string;
}
