import mongoose from "mongoose";

const addressCollection = "addresses";

const addressSchema = new mongoose.Schema({
  via: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  appartament: {
    type: String,
    required: true
  },
  riferimento: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  localita: {
    type: String,
    required: true
  },
  provincia: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  }
});

const AddressModel = mongoose.model(addressCollection, addressSchema);

export default AddressModel;

