import mongoose from 'mongoose'

export default async function connectMongoDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise() // 이미 연결된 경우
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {})
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
}
