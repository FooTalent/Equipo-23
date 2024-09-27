import moment from "moment";

const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY HH:mm:ss");
};

export default class TicketDTO {
  constructor() {
  }

  static getTicketDto = (ticket) => {
   return {
    id:ticket._id,
    code:ticket.code,
    date:formatDate(ticket.purchase_datetime),
    amount:ticket.amount,
    purchaser:ticket.purchaser,
   }
  };
}
