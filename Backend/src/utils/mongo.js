import mongoose from 'mongoose';
import config from '../config/config.js';



export async function connnectDB() {
  try {
    await mongoose.connect(config.mongoUrl);
    console.log('MongoDB connected to app');
  } catch (error) {
    console.log('Error connecting to MongoDB');
    if (error.name === 'MongoNetworkError' || error.name === 'MongooseServerSelectionError') {
     throw new Error('MongoDB connection error');
    }
  }
}
