import { RequestHandler } from 'express'
import admin from 'firebase-admin'
const serviceAccount = require("./firebase-key")
const BUCKET: string = "whatsapp-clone-6e69b.appspot.com"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET
})


const bucket = admin.storage().bucket()

//Middleware
    //Upload archives
        export const UploadImage: RequestHandler = (req, res, next) => {
            if (!req.file) {
                return res.status(500).json({
                    result: false,
                    error: 'Imagem não encontrada!'
                })
            }

            const image = req.file
            const mime: any = "." + image.originalname.split('.').pop()
            const archiveName: string = Date.now() + mime

            const file = bucket.file(archiveName)

            const stream = file.createWriteStream({
                metadata: {
                    contentType: image.mimetype
                }
            })

            stream.on('error', (err) => {
                console.error("Erro no firebase: " + err)
            })

            stream.on('finish', async() => {
                await file.makePublic();

                (req.file as any).FirebaseURL = `https://storage.googleapis.com/${BUCKET}/${archiveName}`
                
                next()
            })

            stream.end(image.buffer)
        }