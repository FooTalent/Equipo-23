import mongoose from "mongoose";

const verificationRegisterUserCollection = "verificationCodes";

const verificationRegisterUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: String,
  last_name: String,
  age: Number,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const verificationRegisterUserModel = mongoose.model(
  verificationRegisterUserCollection,
  verificationRegisterUserSchema
);

export default verificationRegisterUserModel;
