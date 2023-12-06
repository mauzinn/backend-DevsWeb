import * as yup from 'yup'
import { IAuthenticationRequest, ICodeSchema, ICodeVerifySchema, IDecodeJWT, IContactsRead, IContactsCreate, IMessageRead } from '../interfaces'


//Schemas
    export const CodeGenerateSchema: yup.Schema<ICodeSchema> = yup.object().shape({
        email: yup.string().email().min(5).max(150).required()
    })

    export const CodeVerifySchema: yup.Schema<ICodeVerifySchema> = yup.object().shape({
        code: yup.string().min(4).max(4).required()
    })

    export const AuthenticationSchema: yup.Schema<IAuthenticationRequest> = yup.object().shape({
        email: yup.string().email().min(5).max(150).required(),
        name: yup.string().email().min(3).max(140).required(),
        about: yup.string().min(1).max(60).required()
    })

    export const DecodeJWTSchema: yup.Schema<IDecodeJWT> = yup.object().shape({
        token: yup.string().min(40).max(400).required()
    })

    export const ContactsReadSchema: yup.Schema<IContactsRead> = yup.object().shape({
        email: yup.string().email().min(5).max(150).required(),
        token: yup.string().min(40).max(400).required()
    })

    export const ContactsCreateSchema: yup.Schema<IContactsCreate> = yup.object().shape({
        email: yup.string().email().min(5).max(150).required(),
        by: yup.string().email().min(5).max(150).required(),
        token: yup.string().min(40).max(400).required()
    })

    export const MessageReadSchema: yup.Schema<IMessageRead> = yup.object().shape({
        room: yup.string().email().min(5).max(150).required(),
        token: yup.string().min(40).max(400).required()
    })