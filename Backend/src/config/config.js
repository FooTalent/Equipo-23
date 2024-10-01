import dotenv from 'dotenv'

dotenv.config();

export default {
    persistence: process.env.PERSISTENCE,
    port: process.env.PORT,
    mongoUrl: process.env.URL_MONGODB,
    tokenKey: process.env.TOKEN_KEY,
    clientIdGitHub: process.env.CLIENT_ID_GITHUB,
    clienteSecretsGitHub: process.env.CLIENT_SECRETS_GITHUB,
    environment: process.env.ENVIRONMENT,
    passwordGmail: process.env.GMAIL_APP_PASSWORD,
    userGmail: process.env.GMAIL_APP_USER,
    correoGmail: process.env.GMAIL_APP_EMAIL,
    mailtrap_host: process.env.MAILTRAP_HOST,
    mailtrap_port: process.env.MAILTRAP_PORT,
    mailtrap_user: process.env.MAILTRAP_USER,
    mailtrap_pass: process.env.MAILTRAP_PASSWORD,
    AppUrl: process.env.APP_URL,
    tokenCookie: process.env.TOKEN_COOKIE,
    googleClient: process.env.GOOGLE_CLIENT,
    googleSecret: process.env.GOOGLE_SECRET,
    googleCallBackUrl: process.env.GOOGLE_CALLBACK_URL
}