import { transport } from "./transport"


//Middleware
    //Send email
        export const SendMail = (to: string, subject: string, message: string) => {
            transport.sendMail({
                from: `DevsWeb chat <${process.env.EMAIL_USER}>`,
                to: to,
                subject: subject,
                text: message
            })
        }