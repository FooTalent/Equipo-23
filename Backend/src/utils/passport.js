import passport from "passport";
import jwt from "passport-jwt";
import config from "../config/config.js";

// passport google
import GoogleStrategy from "passport-google-oauth20";
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
          const userExist = await usersRepository.getUserBy({ email: profile.emails[0].value });
          if (userExist) {
            return done(null, userExist);
          }
          const age = calculateAge(profile.birthday);
          const user = {
            name: profile.displayName,
            email: profile.emails[0].value,
            age: age,
          };
          usersRepository.createUser(user);
          const findUser = await usersRepository.getUserBy({ email: user.email });
          return done(null, findUser);
        } catch (err) {
          console.log(err);
          return done(err);
        }
      }
    )
  );
};
export default initializatePassport;
