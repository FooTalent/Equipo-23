import { promises as fs } from "fs";
import ProductManager from "./ProductManager.js";

const productManager = new ProductManager("../../data/products.json");

export default class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  async getCarts() {
    try {
      // Verificar si el archivo existe antes de intentar leerlo
      const fileExists = await fs
        .access(this.path)
        .then(() => true)
        .catch(() => false);

      if (fileExists) {
        const cartsFile = await fs.readFile(this.path, "utf-8");
        const carts = JSON.parse(cartsFile);
        return Array.isArray(carts) ? carts : [];
      } else {
        console.log(`El archivo ${this.path} no existe.`);
        return [];
      }
    } catch (error) {
      console.log("error getting carts: ", error);
    }
  }

  async createCart() {
    const cart = {};
    try {
      const carts = await this.getCarts();
      if (carts.length == 0) {
        cart.id = 1;
      } else {
        cart.id = carts[carts.length - 1].id + 1;
      }
      cart.products = [];
      carts.push(cart);
      await fs.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    } catch (error) {
      console.log("error creating cart:", error);
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id == id);
      if (!cart) {
        return undefined;
      } else {
        return cart;
      }
    } catch (error) {
      console.log("error getting cart: ", error);
    }
  }
  async addProductToCart(idCart, idProduct) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id == idCart);
      if (!cart) return false;
      const productIndex = cart.products.findIndex(
        (product) => product.id == idProduct
      );
      const product = await productManager.getProductById(idProduct);
      if (!product) return false;
      if (productIndex !== -1) {
        // Si el producto ya existe, actualizar la cantidad
        cart.products[productIndex].quantity += 1;
      } else {
        // Si el producto no existe, agregarlo al carrito
        cart.products.push({
          id: idProduct,
          quantity: 1,
        });
      }
      await fs.writeFile(this.path, JSON.stringify(carts, null, "\t"));
      return true;
    } catch (error) {
      console.log("error when adding product to cart", error);
    }
  }
}
