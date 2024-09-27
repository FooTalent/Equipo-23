import bcrypt from "bcrypt";

function createHash(password) {
  const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return hash;
}

function isValidPassword(user, password) {
  const isValid = bcrypt.compareSync(password, user.password);
  return isValid;
}

export { createHash, isValidPassword };
