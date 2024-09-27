import jwt from "jsonwebtoken";
import config from "../config/config.js";


export const generateTokenResetPassoword = (data) => {
  const token = jwt.sign({data},config.tokenKey, { expiresIn: "5m" });
  return token;
};

export const generateAuthToken = (data) => {
  const token = jwt.sign( {data},config.tokenKey, { expiresIn: "1h" });
  return token;
};

export const generateConfirmationRegisterUserToken = (data) => {
  const token = jwt.sign( {data},config.tokenKey, { expiresIn: "10m" });
  return token;
};


export const decodedToken = (token) =>{
  try {
    const decoded = jwt.verify(token, config.tokenKey);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    } else {
      throw new Error('Token error');
    }
  }
}

export const decodeTokenWithoutVerify = (token) => {
  return jwt.decode(token);
};