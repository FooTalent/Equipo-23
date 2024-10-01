import nodemailer from 'nodemailer'
import config from '../config/config.js'

console.log(config.userGmail)
console.log(config.passwordGmail)

const configMail = {}

if (config.environment === 'production') {
    configMail.service = 'gmail'
    configMail.auth = {
        user: config.userGmail,
        pass: config.passwordGmail
    }
} else {
    configMail.host = config.mailtrap_host
    configMail.port = 2525
    configMail.auth = {
        user: config.mailtrap_user,
        pass: config.mailtrap_pass
    }
}

export const transport = nodemailer.createTransport(configMail)