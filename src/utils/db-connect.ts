// dbConnect.ts
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    'Пожалуйста, определите переменную окружения MONGODB_URI в файле .env.local'
  )
}

/**
 * Кэшируем соединение, чтобы не создавать его заново при каждом вызове API.
 * @see https://mongoosejs.com/docs/lambda.html
 */
interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // Это нужно для того, чтобы TypeScript не ругался на свойство "mongoose" в глобальном объекте.
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached!.conn) {
    return cached!.conn
  }

  if (!cached!.promise) {

    cached!.promise = mongoose.connect(MONGODB_URI!).then((mongoose) => {
      return mongoose
    })
  }

  cached!.conn = await cached!.promise
  return cached!.conn
}

export default dbConnect
