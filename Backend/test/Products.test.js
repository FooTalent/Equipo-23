import mongoose from "mongoose";
import Assert from "assert";

import config from "../src/config/config.js";
import Product from "../src/dao/mongo/ProductMongo.js";

const productMongo = new Product();
const assert = Assert.strict;

describe("Test Product Mongo", function () {
  before(async function () {
    await mongoose.connect(config.mongoUrl);
  });
  beforeEach(function () {
    this.timeout(5000);
  });
  it("El metodo get del dao debe obtener los usuarios en formato de array", async function () {
    const result = await productMongo.get();
    assert.strictEqual(Array.isArray(result.data), true);
  });
});
