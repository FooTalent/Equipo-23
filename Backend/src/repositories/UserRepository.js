export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getUsers() {
    let result = await this.dao.get();
    return result;
  }

  async createUser(user) {
    let result = await this.dao.create(user);
    return result;
  }

  async getUserBy(params) {
    let result = await this.dao.getBy(params);
    return result;
  }
  async deleteUserBy(params) {
    let result = await this.dao.deleteBy(params);
    return result;
  }
  async deleteMany(cond) {
    let result = await this.dao.deleteMany(cond);
    return result;
  }
  async updateUserBy(params, data) {
    let result = await this.dao.updateBy(params, data);
    return result;
  }
}
