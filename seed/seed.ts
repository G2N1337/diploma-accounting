// seed.ts
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

import AccountChangeType, { AccountChangeTypeEnum } from '../src/utils/schemas/account-change-type';
import { seedCollection } from './seedCollection';


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

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI || '';
    await mongoose.connect(mongoUri);
    console.log('[🚀] Connected to MongoDB for seeding.');

    // Универсальный посев для коллекции AccountChangeType
    // @ts-expect-error: IDK
    await seedCollection(AccountChangeType, accountChangeTypes);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
