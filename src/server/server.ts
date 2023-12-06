import express from 'express'
const server: express.Express = express()
import { Router } from './router/router'
import cors from 'cors'


//Configurations
    //Express parser
        server.use(express.json())

    //Cors
        server.use(cors({origin: 'http://localhost:8080'}))




//Router
    server.use(Router)













//Exports
    export { server }