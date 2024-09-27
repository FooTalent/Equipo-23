import { Router } from "express";
import messageModel from "../../dao/mongo/models/messageModel.js";
import { passportCall } from "../../middlewares/passportMiddleware.js";
import { authorization } from "../../middlewares/authMiddleware.js";

const messageRouter = Router();

messageRouter.get("/",async(req,res)=>{//mal
    try {
        const result = await messageModel.find();
        res.status(200).json({messages:result})
    } catch (error) {
        res.status(500).json({message:"Error controlador message"})
    }
});
messageRouter.post("/",passportCall('jwt'),authorization('user') ,async(req,res)=>{//mal
    const {correo,message} = req.body;
    try {
        const result = await messageModel.insertMany({correo,message});
        res.status(201).json({status:"succes",messages:"Mensaje creado",payload:result})
    } catch (error) {
        res.status(500).json({message:"Error controlador message"})
    }
});

export default messageRouter;
