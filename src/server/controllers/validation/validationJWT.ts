import { RequestHandler } from "express"
import jwt from 'jsonwebtoken'
const SECRET: any = process.env.SECRET_KEY


//Middleware
    //Validation JWT
        export const validationJWT: RequestHandler = async(req, res, next) => {

            try {
                const token: string = req.body.token

                const tokenVerified = jwt.verify(token, SECRET)

                if (tokenVerified) {
                    return next()
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