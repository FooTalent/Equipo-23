import { Router } from 'express';

import { tickets } from '../../controllers/index.js';
import { passportCall } from '../../middlewares/passportMiddleware.js';
import { authorization } from '../../middlewares/authMiddleware.js';

const ticketRouter = Router();

ticketRouter.get('/', passportCall('jwt'),authorization('admin'),tickets.getTickets);
ticketRouter.get('/:tid', passportCall('jwt'),authorization('admin'),tickets.getTicketById);
ticketRouter.delete('/:tid', passportCall('jwt'),authorization('admin'),tickets.deleteTicketById);

export default ticketRouter;
 