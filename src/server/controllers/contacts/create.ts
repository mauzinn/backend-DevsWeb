import { RequestHandler } from "express"
import { Contacts, User } from "../../database"

//Interface
    interface IData {
        room: string,
        name: string | undefined,
        about: string | undefined,
        src: string | undefined
    }


//Midleeware
    //Create contacts
        export const Create: RequestHandler = async(req, res) => {
            const { email, by } = req.body
            const ContactExists = await User.findOne({email: email})
            const UserExists = await User.findOne({email: by})
            const ContactsUser = await Contacts.findOne({by: by})
            const ContactsContact = await Contacts.findOne({by: email})

            if (!ContactExists) {
                return res.status(400).json({
                    result: false,
                    error: "Contact not found"
                })
            }

            const DATA: IData = {
                room: email,
                name: ContactExists?.name,
                about: ContactExists?.about,
                src: ContactExists?.image
            }

            const DATA2: IData = {
                room: email,
                name: UserExists?.name,
                about: UserExists?.about,
                src: UserExists?.image
            }

            if (ContactsUser) {
                const newContact: any = ContactsUser.contacts


                newContact.push(DATA)

                await Contacts.updateOne({by: by}, {
                    contacts: newContact
                }).then(() => {
                    if (ContactsContact) {
                        const newContact2: any = ContactsContact.contacts

                        newContact2.push(DATA2)

                        Contacts.updateOne({by: email}, {
                            contacts: newContact2
                        })
                    } else {
                        new Contacts({
                            by: email,
                            contacts: [DATA2]
                        }).save()
                    }

                    return res.status(201).json({
                        result: true
                    })
                }).catch(() => {
                    return res.status(500).json({
                        result: false,
                        error: "Contact not added why error internal"
                    })
                })
            } else {
                await new Contacts({
                    by: by,
                    contacts: [DATA]
                }).save().then(() => {
                    if (ContactsContact) {
                        const newContact2: any = ContactsContact.contacts

                        newContact2.push(DATA2)
                        
                        Contacts.updateOne({by: email}, {
                            contacts: newContact2
                        })
                    } else {
                        new Contacts({
                            by: email,
                            contacts: [DATA2]
                        }).save()
                    }

                    return res.status(201).json({
                        result: true
                    })
                }).catch(() => {
                    return res.status(500).json({
                        result: false,
                        error: "Contact not added why error internal 2"
                    })
                })
            }
        }