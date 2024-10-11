import mongoose from "mongoose";

const shipmentCollection = "shipments";

const shpimentSchema = new mongoose.Schema({
  shippingDate: {
    type: Date,
    default: Date.now,
  },
  shippingNote: {
    type: String,
    require: true
  },
  phone: {
    type: Number,
    require: true
  },
  dni: {
    type: Number,
    require: true
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "addresses",
    require: true
  }
});

const ShipmentModel = mongoose.model(shipmentCollection, shpimentSchema);

export default ShipmentModel;
