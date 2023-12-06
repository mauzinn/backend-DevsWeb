import { RequestHandler } from "express"
import { User } from "../../database"
import jwt from 'jsonwebtoken'
const SECRET: any = process.env.SECRET_KEY


//Middleware
    //Authentication account
        export const Authentication: RequestHandler = async(req, res) => {

            if (!req.file) {
                return res.status(500).json({
                    result: false,
                    error: 'Erro interno do servidor.'
                })
            }

            const { email, name, about } = req.body

            const accountExists = await User.findOne({email: email})
            const data: { name: string, about: string, email: string } = {
                name,
                about,
                email
            }

            if (accountExists) {

                const token = jwt.sign({data}, SECRET)


                User.updateOne({email: email},{
                    name: name, about: about, image: (req.file as any).FirebaseURL
                }).then(() => {
                    return res.status(201).json({
                        result: true,
                        token
                    })
                }).catch(() => {
                    return res.status(500).json({
                        result: false,
                        error: 'Erro interno do servidor.'
                    })
                })

            } else {

                const token = jwt.sign({data}, SECRET)


                new User({
                    email,
                    name,
                    about,
                    image: (req.file as any).FirebaseURL
                }).save().then(() => {
                    return res.status(201).json({
                        result: true,
                        token
                    })
                }).catch(() => {
                    return res.status(500).json({
                        result: false,
                        error: 'Erro interno do servidor.'
                    })
                })

            }

        }