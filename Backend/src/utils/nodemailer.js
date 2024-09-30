import nodemailer from 'nodemailer'
import config from '../config/config.js'

console.log(config.userGmail)
console.log(config.passwordGmail)

export const transport = nodemailer.createTransport({
    host: config.mailtrap_host,
    port: 2525,
    auth: {
        user: config.mailtrap_user,
        pass: config.mailtrap_pass
    }
})