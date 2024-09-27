export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getCarts() {
    let result = await this.dao.get();
    return result;
  }

  async createCart() {
    let result = await this.dao.create();
    return result;
  }

  async getCartById(id) {
    let result = await this.dao.getById(id);
    return result;
  }
  async addProductFromCart(cid, pid) {
    let result = await this.dao.addProd(cid, pid);
    return result;
  }

  async deleteProductsCart(cid) {
    let result = await this.dao.deleteAll(cid);
    return result;
  }
  async deleteProduct(cid, pid) {
    let result = await this.dao.delete(cid, pid);
    return result;
  }

  async updateProductsCart(cid, products) {
    let result = await this.dao.updateAll(cid, products);
    return result;
  }
  async updateProduct(cid, pid, quantity) {
    let result = await this.dao.update(cid, pid, quantity);
    return result;
  }
  async purchaseCart(cid) {
    let result = await this.dao.purchase(cid);
    return result;
  }
  async deleteCartById(cid){
    let result = await this.dao.deleteCart(cid);
    return result ;
  }
  async removeDeletedProductsFromcart(pid){
    let result = await this.dao.removeDeletedProducts(pid);
    return result;
  }
}