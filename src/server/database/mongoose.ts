import mongoose from "mongoose"
import { IContacts, IContactsUser, IMessageSchema, IUserDatabase } from "../services/interfaces"
const URL: any = process.env.DATABASE_URL

mongoose.connect(URL)

const db = mongoose.connection

db.on('error', (err) => {
    console.log('Mongoose have a error: ' + err)
})

db.on('connection', () => {
    console.log('DATABASE_CONNECTION has connected')
})

const UserSchema: mongoose.Schema<IUserDatabase> = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const User: mongoose.Model<IUserDatabase> = mongoose.model('user', UserSchema)


const MessageSchema: mongoose.Schema<IMessageSchema> = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    by: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    }
})

const Message: mongoose.Model<IMessageSchema> = mongoose.model('message', MessageSchema)

const ContactsSchema: mongoose.Schema<IContacts> = new mongoose.Schema({
    src: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    }
})

const ContactsUserSchema: mongoose.Schema<IContactsUser> = new mongoose.Schema({
    by: {
        type: String,
        required: true
    },
    contacts: [ContactsSchema]
})

const Contacts: mongoose.Model<IContactsUser> = mongoose.model('contacts', ContactsUserSchema)


//Export
    export { User, Message, Contacts }