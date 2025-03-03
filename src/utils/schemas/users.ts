import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';


export interface IUser extends Document {
  name: string;
  role: mongoose.Types.ObjectId;
  login: string;
  password: string
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
});
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre('save', async function (next: () => void) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
