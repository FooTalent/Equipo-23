import { promises as fs } from "fs";

export default class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  verifyFields({
    title,
    description,
    price,
    category,
    thumbnail,
    code,
    stock,
  }) {
    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !thumbnail ||
      !code ||
      !stock
    ) {
      return false;
    } else {
      return true;
    }
  }


  async getProducts() {
    try {
      const productsFile = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(productsFile);
      return products;
    } catch (error) {
      console.log("error getting all products: ", error);
      return [];
    }
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts();
      const existingCode = products.some(
        (p) => p.code === product.code
      );
      if (existingCode) {
        console.log("product with code ${product code} exists");
      } else {
        product.id = products[products.length - 1].id + 1;
        products.push(product);
      }
      await fs.writeFile(this.path, JSON.stringify(products, null, "\t"));
    } catch (error) {
      console.log("error adding product: ", error);
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find((product) => product.id == id);
      if (!product) {
        return undefined;
      } else {
        return product;
      }
    } catch (error) {
      console.log("error getting product: ", error);
    }
  }

  async updateProduct(id, updateProduct) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id == id);
      if (index == -1) return -1;
      for (const key in updateProduct) {
        if (updateProduct[key] !== undefined) {
          products[index][key] = updateProduct[key];
        }
      }
      await fs.writeFile(this.path, JSON.stringify(products, null, "\t"));
    } catch (error) {
      console.log("error updating product: ", error);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id == id);
      if (index == -1) return -1;
      products.splice(index, 1);
      await fs.writeFile(this.path, JSON.stringify(products, null, "\t"));
    } catch (error) {
      console.log("error deleting product", error);
    }
  }
}
