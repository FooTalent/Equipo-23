import nodemailer from 'nodemailer'
import config from '../config/config.js'

export const transport = nodemailer.createTransport({
    service: 'gmail',
    port:8080,
    auth:{
        user:config.correoGmail,
        pass:config.passwordGmail
    }
})