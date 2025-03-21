import * as mongoose from 'mongoose';
import { WalletType } from '../types/wallet';

const WalletSchema: mongoose.Schema<WalletType> = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
    default: 'Счет'
  },
  balance: {
    type: Number,
    required: true,
  }
});
const Wallet: mongoose.Model<WalletType> = mongoose.models.Wallet || mongoose.model('Wallet', WalletSchema);

export default Wallet;
