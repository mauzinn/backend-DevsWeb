import { RequestHandler } from "express"
import { LocalDB } from "../../database"

//Middleware
    //Validation code
        export const ValidateCODE: RequestHandler = (req, res) => {
            const { code } = req.body

            const item: any = LocalDB.codes.filter(codeObject => code == codeObject.code)

            if (!item[0]) {
                return res.status(400).json({
                    result: false,
                    error: 'Codigo incorreto!'
                })
            }

            LocalDB.codes.splice(item.id, 1)

            res.status(201).json({
                result: true
            })
        }