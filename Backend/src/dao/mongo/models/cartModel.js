import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: [
    {
      prodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: {
        type: Number,
      },
      price: {
        type: Number,
      },
    },
    
  ],
  totalPrice:{
    type:Number
  }
});

cartSchema.pre("find", function () {
  this.populate("products.prodId");
});

const cartModel = mongoose.model(cartCollection, cartSchema);
export default cartModel;
