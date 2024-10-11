import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      required: true,
    },
    surnames: {
      type: String,
      required: false,
      default: ""
    },
    phone: {
      type: String,
      required: false,
      default: ""
    },
    country: {
      type: String,
      required: false,
      default: ""
    },
    locality: {
      type: String,
      required: false,
      default: ""
    },
    photo: {
      type: String,
      required: false,
      default: ""
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
      required: false,
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
      required: true,
    },
    isGoogle: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin", "vendor"],
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
    }
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
