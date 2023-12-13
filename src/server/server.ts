import express from 'express'
const server: express.Express = express()
import { Router } from './router/router'
import cors from 'cors'


//Configurations
    //Express parser
        server.use(express.json())

    //Cors
        server.use(cors({origin: 'https://frontend-devs-web.vercel.app'}))




//Router
    server.use(Router)













//Exports
    export { server }