import { RequestHandler } from "express"
import { Contacts, User } from "../../database"


//Middleware
    //Read contacts
        export const Read: RequestHandler = async(req, res) => {
            const { email } = req.body
            const ContactsExists = await Contacts.findOne({by: email})

            if(!ContactsExists) {
                return res.status(201).json({
                    result: true,
                    contacts: []
                })
            }

            return res.status(201).json({
                result: true,
                contacts: ContactsExists.contacts
            })
        }