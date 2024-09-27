import passport from "passport";


export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        try {
          return res.status(401).json({
            success:false,
            message:'You are unauthenticated'
          })
        } catch (error) {
          return next(error);
        }
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};



export const passportCallOptional = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};



/**
 * PASSPORT BY ¡¡ VIEW !!
 */

export const passportCallView = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        try {
         return res.render("not-available")
        } catch (error) {
          return next(error);
        }
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

