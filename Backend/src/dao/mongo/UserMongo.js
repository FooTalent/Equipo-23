import userModel from "./models/userModel.js";

export default class User {
  constructor() {}

  async get() {
    return await userModel.find();
  }
  async getBy(params) {
    return await userModel.findOne(params);
  }
  async create(data) {
    return await userModel.insertMany(data);
  }
  async deleteBy(params) {
    return await userModel.findOneAndDelete(params);
  }
  async deleteMany(cond) {
    return await userModel.deleteMany(cond);
  }
  async updateBy(params, data) {
    return await userModel.findOneAndUpdate(params, { ...data }, { new: true });
  }
}
