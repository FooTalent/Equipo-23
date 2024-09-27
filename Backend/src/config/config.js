import dotenv from 'dotenv'

dotenv.config();

export default{
    persistence: process.env.PERSISTENCE,
    port:process.env.PORT,
    mongoUrl:process.env.URL_MONGODB,
    tokenKey: process.env.TOKEN_KEY,
    clientIdGitHub:process.env.CLIENT_ID_GITHUB,
    clienteSecretsGitHub: process.env.CLIENT_SECRETS_GITHUB,
    environment: process.env.ENVIRONMENT,
    passwordGmail:process.env.PASSWORD_APP_GMAIL,
    correoGmail: process.env.CORREO_GMAIL,
    AppUrl: process.env.APP_URL,
    tokenCookie:process.env.TOKEN_COOKIE
}