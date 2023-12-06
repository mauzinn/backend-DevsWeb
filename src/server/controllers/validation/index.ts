import * as validateCODE from './validateCode'
import * as validateJWT from './validationJWT'
import * as validateYUP from './validationYUP'

export const Validate = {
    ...validateCODE,
    ...validateJWT,
    ...validateYUP
}