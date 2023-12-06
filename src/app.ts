require('dotenv').config()
import express from 'express'
const app: express.Express = express()
const PORT: number | string = process.env.PORT || 3000
import { server } from './server/server'
import { LocalDB } from './server/database'
import { createServer } from 'http'
const httpServer = createServer(app)

//Server config
    app.use(server)










//Socket io
import { Server } from 'socket.io'
import { Message } from './server/database/mongoose'
import { IMessageSchema } from './server/services'
const io = new Server(httpServer, {cors: {origin: 'http://localhost:8080'}})
type TData = {
        message: string,
        by: string,
        room: string
    }


//Io events
    io.on('connection', (socket) => {
        const DATA_USER: { id: string, messages: IMessageSchema[] } = {
            id: socket.id,
            messages: []
        }

        console.log(`Socket com id: [${socket.id}] se conectou com sucesso!`)

        socket.emit('USER_ID', socket.id)

        socket.on('disconnect', () => {
            const index: number = LocalDB.users.findIndex(user => user.id == socket.id)
            console.log(`Socket com id: [${socket.id}] se desconectou!`)
            LocalDB.users.splice(index, 1)
        })


        socket.on('SEND_MESSAGE', (data: TData) => {

            new Message({
                message: data.message,
                by: data.by,
                room: data.room
            }).save().then(() => {
                io.to(data.room).emit('SEND_MESSAGE', data)

                DATA_USER.messages.push(data)

                LocalDB.users.push(DATA_USER)
            })

        })

        socket.on('CHANGE_ROOM', (room_id: string) => {
            socket.join(room_id)
        })


    })











//Server
    httpServer.listen(PORT, () => {
        console.log('Server has listen in port: ' + PORT)
    })