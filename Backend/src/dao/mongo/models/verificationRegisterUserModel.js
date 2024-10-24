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
  name: String,
  lastName: String,
  age: {
    type: Number,
    required: false,
  },
  password: String,
  role: {
    type: String,
    enum: ["user", "admin", "vendor"],
    default: "vendor",
    required: true,
  },
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
