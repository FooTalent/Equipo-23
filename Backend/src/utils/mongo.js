import mongoose from 'mongoose';
import config from '../config/config.js';



export async function connnectDB() {
  try {
    await mongoose.connect(config.mongoUrl);
  } catch (error) {
    if (error.name === 'MongoNetworkError' || error.name === 'MongooseServerSelectionError') {
      throw new Error('MongoDB connection error');
    }
  }
}
