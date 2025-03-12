// seed.ts
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

import AccountChangeType from '../src/utils/schemas/account-change-type';
import ExpenseCategories from '../src/utils/schemas/expense-categories';
import { seedCollection } from './seedCollection';
import { AccountChangeTypeEnum } from '@/utils/enums/account-change-type';


const accountChangeTypes = [
  {
    name: AccountChangeTypeEnum.Income,
    color: '#118c4f',
  },
  {
    name: AccountChangeTypeEnum.Expense,
    color: '#c92a2a',
  },
];

const expenseCategories = [
  { value: "restaurant", label: "Ресторан" },
  { value: "groceries", label: "Продукты" },
  { value: "transport", label: "Транспорт" },
  { value: "games", label: "Игры" },
  { value: "movies", label: "Фильмы" },
  { value: "pharmacy", label: "Аптека" },
  { value: "clothing", label: "Одежда" },
  { value: "electronics", label: "Электроника" },
  { value: "entertainment", label: "Развлечения" },
  { value: "education", label: "Образование" },
  { value: "healthcare", label: "Медицина" },
  { value: "subscriptions", label: "Подписки" },
  { value: "utilities", label: "Коммунальные платежи" },
  { value: "travel", label: "Путешествия" },
  { value: "gifts", label: "Подарки" },
  { value: "fitness", label: "Фитнес и спорт" },
  { value: "home", label: "Дом и быт" },
  { value: "pets", label: "Домашние животные" },
  { value: "insurance", label: "Страховка" },
  { value: "charity", label: "Благотворительность" }
];

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI || '';
    await mongoose.connect(mongoUri);
    console.log('[🚀] Connected to MongoDB for seeding.');

    // Универсальный посев для коллекции AccountChangeType
    // @ts-expect-error: IDK
    await seedCollection(AccountChangeType, accountChangeTypes);
    // @ts-expect-error: IDK
    await seedCollection(ExpenseCategories, expenseCategories);


    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
