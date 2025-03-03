// seedCollection.ts
import { Model, Document } from 'mongoose';

export async function seedCollection<T extends Document>(
  model: Model<T>,
  seedData: Partial<T>[]
): Promise<void> {
  const count = await model.countDocuments();
  if (count === 0) {
    await model.insertMany(seedData);
    console.log(`[🆙] Default documents inserted to ${model.collection.collectionName} Collection`);
  } else {
    console.log(`[⚠️] Collection ${model.collection.collectionName} already seeded.`);
  }
}
