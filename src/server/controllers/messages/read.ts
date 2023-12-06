import { RequestHandler } from "express"
import { Message } from "../../database"


//Middleware
    //Read messages
        export const Read: RequestHandler = async(req, res) => {
            const { room } = req.body 
            const Messages = await Message.find({room: room})
            
            return res.status(201).json({
                result: true,
                messages: Messages
            })
        }