import ticketModel from "./models/ticketModel.js";

export default class Ticket {
  constructor() {}

  async get() {
    return await ticketModel.find();
  }
  async getById(id) {
    return await ticketModel.findOne({ _id: id })
  }
  async create(data) {
    return await ticketModel.insertMany(data);
  }
  async delete(id){
    return await ticketModel.findOneAndDelete({ _id: id });
  }

}
