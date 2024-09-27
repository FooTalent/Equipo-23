export default class TicketRepository {
    constructor(dao) {
      this.dao = dao;
    }
    async getTickets() {
      let result = await this.dao.get();
      return result;
    }
  
    async createTicket(ticket) {
      let result = await this.dao.create(ticket);
      return result;
    }
  
    async getTicketById(id) {
      let result = await this.dao.getById(id);
      return result;
    }
    async deleteTicketById(id) {
      let result = await this.dao.delete(id);
      return result;
    }

  }
  