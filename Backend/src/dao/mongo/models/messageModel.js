import mongoose from "mongoose";

const messageCollection = "messages";

const messageSchema = new mongoose.Schema(
  {
    correo: {
      type: String,
      required: true,
      ref: "users",
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const messageModel = mongoose.model(messageCollection, messageSchema);

export default messageModel;
