export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getProducts(limit, page, sort, query) {
    let result = await this.dao.get(limit, page, sort, query);
    return result;
  }

  async createProduct(product) {
    let result = await this.dao.create(product);
    return result;
  }

  async getProductBy(params) {
    let result = await this.dao.getBy(params);
    return result;
  }
  async getProductLeanBy(params) {
    let result = await this.dao.getLeanBy(params);
    return result;
  }
  async updateProductBy(params, data) {
    let result = await this.dao.updateBy(params, data);
    return result;
  }
  async updatePurchaseProductById(pid,quantity) {
    let result = await this.dao.updatePurchase(pid,quantity);
    return result;
  }
  async deleteProductBy(params) {
    let result = await this.dao.deleteBy(params);
    return result;
  }
}
