import { ticketRepository } from "../repositories/index.js";
import TicketDTO from "../dao/dto/TicketDto.js";


export const getTickets = async (req, res) => {
    let result = await ticketRepository.getTickets();
    const ticketsDto = result.map((ticket) => TicketDTO.getTicketDto(ticket));
    res.status(200).json({ succes: true, data: ticketsDto })
}

export const getTicketById = async (req, res) => {
    const id = req.params.tid
    const ticket = await ticketRepository.getTicketById(id);
    if (!ticket) {
        return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    const ticketDto = TicketDTO.getTicketDto(ticket);
    res.status(200).json({ success: true, data: ticketDto });
}


export const deleteTicketById = async (req, res) => {
    const id = req.params.tid;
    const ticket = await ticketRepository.getTicketById(id);

    if (!ticket) {
        return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    const result = await ticketRepository.deleteTicketById(id);
    res.status(200).json({ success: true, data: result });

}
