import { RequestHandler } from "express"
import { SendMail } from "../email/send"
import { LocalDB } from "../../database"


//Middleware
    //Create account
        export const Generate: RequestHandler = async(req, res) => {
            const { email } = req.body
            let encrypted: string = ''

            for(let currentNumber = 0; currentNumber < 4; currentNumber++) {
                let RandomNumber = Math.floor(Math.random() * 10)
                if (currentNumber == 0 && RandomNumber == 0) {
                    encrypted += 1
                } else {
                    encrypted += RandomNumber
                }
            }

            const Data: {code: string, id: number} = {
                code: encrypted,
                id: LocalDB.codes.length
            }
            
            LocalDB.codes.push(Data)
            SendMail(email, 'Step for complete authentication', 
            `You tried to create an account on our website,
            if you confirm this action, take this code and put it there,
            if it wasn't you who did it, just ignore this message.
            YOUR CODE IS: ${encrypted}`)

            return res.json({
                result: true
            })
        }