import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      required: true,
    },
    email: {
      type: String,
      minLength: 3,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 4,
      required: true,
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "vendor"],
      default: "user",
      required: true,
    },
    last_connection: {
      type: Date,
      default: new Date(),
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("find", function () {
  this.populate("cartId");
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;