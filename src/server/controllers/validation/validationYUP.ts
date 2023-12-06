import { RequestHandler } from 'express'
import * as yup from 'yup'


//Middleware
    //Validation yup
        export const validationYUP = (Schema: yup.Schema<any>): RequestHandler => async(req, res, next) => {
            
            try {

                await Schema.validate(req.body)

                return next()

            } catch (err: any) {

                return res.status(400).json({
                    result: false,
                    error: err.message
                })

            }

        }