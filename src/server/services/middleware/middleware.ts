import { RequestHandler } from "express"
import { User } from "../../database"
import jwt from 'jsonwebtoken'
const SECRET: any = process.env.SECRET_KEY


//Middleware
    //Decode JWT and verify
        export const DecodeJWT: RequestHandler = async(req, res) => {

            try {
                const token: string = req.body.token

                const tokenVerified: any = jwt.verify(token, SECRET)

                if (tokenVerified) {

                    return res.status(201).json({
                        result: true,
                        data: tokenVerified.data
                    })

                } else {
                    return res.status(400).json({
                        result: false,
                        error: 'Token incorreto'
                    })
                }
            } catch {
                return res.status(500).json({
                    result: false,
                    error: 'Token não encontrado'
                })
            }

        }