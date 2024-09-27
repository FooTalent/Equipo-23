export function authorization(...allowedRoles){
  return async(req,res,next)=>{
    if (!req.user) {
      try {
        return res.status(401).json({
          success:false,
          message:'You are unauthenticated'
        })
      } catch (error) {
        return next(error); 
      }
    }
    if (!allowedRoles.includes(req.user.data.role)) {
      try {
        return res.status(403).json({
          success:false,
          message:'You are unauthorized'
      
        });
      } catch (error) {
        return next(error); 
      }
    }
    next();
  }
}



/**
 * PASSPORT AUTH BY ¡¡ VIEW !!
 */
export function authorizationViewCreateProduct(...allowedRoles){
  return async(req,res,next)=>{
    if (!req.user) {
      try {
        return res.render("not-available")
      } catch (error) {
        return next(error); 
      }
    } 
    if (!allowedRoles.includes(req.user.data.role)) {
      try {
        return res.render("changeRole")
      } catch (error) {
        return next(error); 
      }
    }
    next();
  }
}


