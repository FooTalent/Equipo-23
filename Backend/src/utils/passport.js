import passport from "passport";
import jwt from "passport-jwt";
import config from "../config/config.js";

// passport google
import GoogleStrategy from "passport-google-oauth20";
import { generateAuthToken } from "./jwt.js";
import { usersRepository } from "../repositories/index.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[config.tokenCookie];
  }
  return token;
};

const initializatePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: config.tokenKey,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (err) {
          console.log(err);
          return done(err);
        }
      }
    )
  );
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: config.googleClient,
        clientSecret: config.googleSecret,
        callbackURL: config.googleCallBackUrl,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);

          const user = {
            name: profile.displayName,
            email: profile.emails[0].value,
            profile,
          };
          const newUser = await usersRepository.createUser(user);
          const token = generateAuthToken(user);
          res.cookie(config.tokenCookie, token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
          });
          return done(null, user);
        } catch (err) {
          console.log(err);
          return done(err);
        }
      }
    )
  );
};
export default initializatePassport;
