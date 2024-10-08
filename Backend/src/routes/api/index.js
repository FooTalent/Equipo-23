import {Router} from 'express';

import productRouter from "./products.routes.js";
import cartRouter from "./cart.routes.js";
import sessionRouter from "./session.routes.js";
import userRouter from "./user.routes.js";
import messageRouter from "./message.routes.js";
import ticketRouter from './tickets.routes.js';
import evolutionRouter from './evolution.routes.js'
import socketRouter from './socket.routes.js'
import chatRouter from './chat.routes.js';
import evolutionApi from './evolutionApi.routes.js';


const router = Router();

router.use('/products/', productRouter);
router.use('/users/', userRouter);
router.use("/carts/", cartRouter);
router.use("/sessions/", sessionRouter);
router.use("/messages/",messageRouter);
router.use("/tickets/",ticketRouter);

// Api Evolution - Routes Internas
router.use('/evolution', evolutionRouter);
router.use("/socket", socketRouter);
router.use('/evolution/chat', chatRouter);

// Api Evolution - Routes => Externas
router.use('/evolutionApi', evolutionApi)




export default router;
