import express from 'express'
const Router: express.Router = express.Router()
import { Validate, Account, Contacts, Messages } from '../controllers'
import { Schemas } from '../services'
import { Middlewares } from '../services'
import { Multer } from '../services'
import { UploadImage } from '../services/firebase/firebase'


//Routes
    //Create code
        Router.post('/code/sign', Validate.validationYUP(Schemas.CodeGenerateSchema), Account.Generate)


    //Verify code
        Router.post('/code/verify', Validate.validationYUP(Schemas.CodeVerifySchema), Validate.ValidateCODE)


    //Authentication account
        Router.post('/account/authentication', Multer.single('image'), UploadImage, Account.Authentication)
    

    //Decode jwt and verify
        Router.post('/jwt/decode', Validate.validationYUP(Schemas.DecodeJWTSchema), Middlewares.DecodeJWT)


    //Create contacts
        Router.post('/contact/create', Validate.validationYUP(Schemas.ContactsCreateSchema), Validate.validationJWT, Contacts.Create)


    //Read contacts
        Router.post('/contact/read', Validate.validationYUP(Schemas.ContactsReadSchema), Validate.validationJWT, Contacts.Read)


    //Read messages
        Router.post('/message/read', Validate.validationYUP(Schemas.MessageReadSchema), Validate.validationJWT, Messages.Read)













//Export
    export { Router }