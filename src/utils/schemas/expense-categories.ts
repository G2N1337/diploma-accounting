import mongoose, { Model, Schema } from 'mongoose';

export interface ExpenseCategoriesType {
  value: string
  label: string
  _id: string
}


const ExpenseCategoriesSchema: Schema<ExpenseCategoriesType> = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    unique: true,
  },
  label: {
    type: String,
    required: true,
    unique: true,
  }
});

const ExpenseCategories: Model<ExpenseCategoriesType> = mongoose.models.ExpenseCategories || mongoose.model<ExpenseCategoriesType>('ExpenseCategories', ExpenseCategoriesSchema);

export default ExpenseCategories;
