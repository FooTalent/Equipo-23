import {Router} from 'express';

import productRouter from "./products.routes.js";
import cartRouter from "./cart.routes.js";
import sessionRouter from "./session.routes.js";
import userRouter from "./user.routes.js";
import messageRouter from "./message.routes.js";
import ticketRouter from './tickets.routes.js';

const router = Router();

router.use('/products/', productRouter);
router.use('/users/', userRouter);
router.use("/carts/", cartRouter);
router.use("/sessions/", sessionRouter);
router.use("/messages/",messageRouter);
router.use("/tickets/",ticketRouter);


export default router;
