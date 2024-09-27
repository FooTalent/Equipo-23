import config from "../../config/config.js";
import productModel from "./models/productModel.js";

const environment = config.environment;

export default class Product {
  constructor() {}

  async get(limit, page, sort, query) {
    const appUrl =
      environment === "development"
        ? `${config.AppUrl}:${config.port}`
        : `${config.AppUrl}`;

    limit = !limit ? 10 : parseInt(limit);
    page = !page ? 1 : parseInt(page);
    query = !query ? {} : { title: query };

    const options = {
      limit: limit,
      page: page,
    };

    // Configure sorting
    if (sort === "desc" || sort === "asc") {
      const sortOrder = sort === "desc" ? -1 : 1;
      options.sort = { price: sortOrder };
    }

    const paginate = await productModel.paginate(query, options);
    const prevPageLink = paginate.hasPrevPage
      ? `${appUrl}/api/products?limit=${limit}&page=${page - 1}&sort=${sort}`
      : null;
    const nextPageLink = paginate.hasNextPage
      ? `${appUrl}/api/products?limit=${limit}&page=${page + 1}&sort=${sort}`
      : null;
    const response = {
      data: paginate.docs,
      totalDocs: paginate.totalDocs,
      totalPages: paginate.totalPages,
      page: paginate.page,
      hasPrevPage: paginate.hasPrevPage,
      hasNextPage: paginate.hasNextPage,
      prevLink: paginate.hasPrevPage ? prevPageLink : null,
      nextLink: paginate.hasNextPage ? nextPageLink : null,
    };

    return response;
  }

  async create(elements) {
    return await productModel.insertMany(elements);
  }
  async getBy(params) {
    return await productModel.findOne(params);
  }
  async getLeanBy(params) {
    return await productModel.findOne(params).lean();
  }
  async updateBy(params, data) {
    return await productModel.findOneAndUpdate(
      params,
      { ...data },
      { new: true }
    );
  }
  async updatePurchase(pid, quantity) {
    return await productModel.findOneAndUpdate(
      { _id: pid, stock: { $gte: quantity } },
      { $inc: { stock: -quantity } },
      { new: true }
    );
  }
  async deleteBy(params) {
    return await productModel.findOneAndDelete(params);
  }
}
