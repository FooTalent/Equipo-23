import cartModel from "./models/cartModel.js";
import productModel from "./models/productModel.js";

export default class Cart {
  constructor() {}

  async get() {
    return await cartModel.find();
  }
  async getById(id) {
    return await cartModel.findById(id).populate("products.prodId").lean();
  }
  async create() {
    return await cartModel.insertMany();
  }

  async addProd(cid, pid) {
    const cart = await cartModel.findOne({ _id: cid });
    const product = await productModel.findById(pid);

    let response;

    const productExists = cart.products.findIndex(
      (prod) => prod.prodId._id == pid
    );

    if (productExists == -1) {
      response = await cartModel.updateOne(
        { _id: cid },
        {
          $push: {
            products: {
              prodId: { _id: pid },
              quantity: 1,
              price: product.price,
            },
          },
        }
      );
    } else {
      response = await cartModel.updateOne(
        {
          _id: cid,
          "products.prodId": pid,
        },
        {
          $inc: { "products.$.quantity": 1 },
          $set: {
            "products.$.price":
              product.price *
              (cart.products.find((p) => p.prodId._id.toString() === pid)
                .quantity +
                1),
          },
        }
      );
    }
    // Actualiza el precio total del carrito
    await this.updateTotalPrice(cid);

    return response;
  }

  async deleteAll(cid) {
    const response = await cartModel.updateOne(
      { _id: cid },
      { $set: { products: [], totalPrice: 0 } }
    );
    return response;
  }

  async delete(cid, pid) {
    const result = await cartModel.updateOne(
      { _id: cid },
      {
        $pull: { products: { prodId: pid } },
      }
    );

    await this.updateTotalPrice(cid);

    return result;
  }

  async updateAll(cid, products) {
    const result = await cartModel.updateMany(
      { _id: cid },
      { $set: { products: products } }
    );
    await this.updateTotalPrice(cid);
    return result;
  }

  async update(cid, pid, quantity) {
    const product = await productModel.findById(pid);
    const update = await cartModel.updateOne(
      { _id: cid, "products.prodId": pid },
      {
        $set: {
          "products.$.quantity": quantity,
          "products.$.price": product.price * quantity,
        },
      }
    );
    // Actualiza el precio total del carrito
    await this.updateTotalPrice(cid);
    return update;
  }
  async deleteCart(cid) {
    return await cartModel.findByIdAndDelete(cid);
  }
  async removeDeletedProducts(pid) {
    return await cartModel.updateMany(
      { "products.prodId": pid },
      { $pull: { products: { prodId: pid } } }
    );
  }
  async updateTotalPrice(cid) {
    const cart = await cartModel.findById(cid).lean();

    const totalPrice = cart.products.reduce((total, product) => {
      return total + product.price; 
    }, 0);

    await cartModel.updateOne(
      { _id: cid },
      { $set: { totalPrice: totalPrice } }
    );
  }
}
