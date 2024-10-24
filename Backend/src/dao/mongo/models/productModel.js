import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      index: true,
    },
    stock: {
      type: Number,
      default: true,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    thumbnails: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          reference: {
            type: String,
            required: true,
          },
          _id: false,
        },
      ],
      default: [],
    },
    owner: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;
