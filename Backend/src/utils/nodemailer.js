import nodemailer from 'nodemailer'
import config from '../config/config.js'

const configMail = {}

if (config.environment === 'production' || config.environment === 'development') {
    configMail.service = 'gmail'
    configMail.port = 465 // 25 or 465 or 587
    configMail.secure = true
    configMail.auth = {
        user: config.userGmail, // apikey
        pass: config.passwordGmail
    }
    configMail.tls = {
        rejectUnauthorized: false
    }
} // else {
//     configMail.host = config.mailtrap_host
//     configMail.port = 2525
//     configMail.auth = {
//         user: config.mailtrap_user,
//         pass: config.mailtrap_pass
//     }
// }

export const transport = nodemailer.createTransport(configMail)