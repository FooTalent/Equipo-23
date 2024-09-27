import config from "../config/config.js";
import { generateAuthToken } from "../utils/jwt.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import UserDTO from "../dao/dto/UserDto.js";
import { cartsRepository, usersRepository } from "../repositories/index.js";
import userModel from "../dao/mongo/models/userModel.js";
import { transport } from "../utils/nodemailer.js";
import verificationRegisterUserModel from "../dao/mongo/models/verificationRegisterUserModel.js";

async function sendCodeConfirmationRegister(userData) {
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const checkVerifyIfExists = await verificationRegisterUserModel.findOne({
    email: userData.email,
  });

  if (checkVerifyIfExists) {
    await verificationRegisterUserModel.deleteOne({ email: userData.email });
  }

  const passwordHash = createHash(userData.password);

  //create check user in db
  await verificationRegisterUserModel.create({
    email: userData.email,
    code: verificationCode,
    first_name: userData.first_name,
    last_name: userData.last_name,
    age: userData.age,
    password: passwordHash,
    createdAt: new Date(),
  });

  //send email to user
  const result = await transport.sendMail({
    from: `E-commerce Coder <${config.correoGmail}>`,
    to: userData.email,
    subject: "Confirmacion de email",
    html: `
          <div>
             <p>Para completar el registro debes introducir el siguiente codigo</p>
             <h2><strong>${verificationCode}</strong></h2>
          </div>
          `,
    attachments: [],
  });
  return result;
}

export async function register(req, res) {
  const { first_name, last_name, age, email, password } = req.body;

  // Verify if exists user with email by body
  let user = await usersRepository.getUserBy({ email: email });
  if (user) {
    return res
      .status(404)
      .json({ succes: false, message: "Email unavailable" });
  }

  await sendCodeConfirmationRegister({
    first_name,
    last_name,
    age,
    email,
    password,
  });

  res.status(200).json({
    message: "Enter the code that appears in the email",
    data: {
      emailSent: true,
      intructions:
        "A verification code has been sent to your email. Please check your inbox and enter the code here to complete your registration. If you don't see the email, check your spam folder or request a new code.",
    },
  });
}

export async function checkCodeRegister(req, res) {
  const { code } = req.body;

  const document = await verificationRegisterUserModel.findOne({
    code: code,
  });

  if (!document) {
    return res
      .status(400)
      .json({ success: false, message: "Verification code not found" });
  }

  // Comparar el código ingresado con el almacenado
  if (document.code !== code) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid verification code" });
  }

  //eliminar el documento de verifiacion
  await verificationRegisterUserModel.deleteOne({ code: code });

  const cartObject = await cartsRepository.createCart();
  const cartId = cartObject[0]._id;

  const newUser = {
    first_name: document.first_name,
    last_name: document.last_name,
    age: document.age,
    email: document.email,
    password: document.password,
    cartId: cartId,
  };

  // Crear el usuario en la base de datos
  await usersRepository.createUser(newUser);
  const user = await usersRepository.getUserBy({ email: document.email });
  await usersRepository.updateUserBy({ _id: user._id }, { isOnline: true });

  const token = generateAuthToken(user);
  res.cookie(config.tokenCookie, token, {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
  });

  res.status(200).json({ success: true, message: "Registration complete" });
}

export async function login(req, res) {
  const { email, password } = req.body;

  //        ------ Verify credentials ------
  const user = await usersRepository.getUserBy({ email: email });
  if (!user) {
    return res
      .status(404)
      .json({ succes: false, message: "Credentials invalids" });
  }

  if (!isValidPassword(user, password)) {
    return res
      .status(404)
      .json({ succes: false, message: "Credentials invalids" });
  }

  // --------------------------

  //IF CREDENTIALS VALIDS

  await usersRepository.updateUserBy(
    { _id: user._id },
    {
      isOnline: true,
    }
  );

  const token = generateAuthToken(user);
  res.cookie(config.tokenCookie, token, {
    maxAgre: 60 * 60 * 1000,
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: "Login correct" });
}

export async function logout(req, res) {
  const email = req.user.data.email;
  const user = await usersRepository.getUserBy({ email: email });
  const fecha = new Date().toISOString();

  await usersRepository.updateUserBy(
    { _id: user._id },
    { last_connection: fecha, isOnline: false }
  );

  res.clearCookie(config.tokenCookie);
  res.status(200).json({ success: true, message: "Logout correct" });
}

// --- RESPONSE USER'S DATA
export async function current(req, res) {
  const result = await UserDTO.getUserResponseForCurrent(req.user.data);
  res.status(200).json({ success: true, data: result });
}

async function seeTheLastConnectionsOfUsers() {
  const usersToDisplay = await userModel.find();

  if (usersToDisplay.length > 0) {
    usersToDisplay.forEach((user) => {
      const lastConnection = new Date(user.last_connection);
      const timeDiff = now - lastConnection;

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      let timeAgo = "";
      if (days > 0) {
        timeAgo += `${days} día${days > 1 ? "s" : ""} `;
      }
      if (hours > 0 || days > 0) {
        timeAgo += `${hours} hora${hours > 1 ? "s" : ""} `;
      }
      if (minutes > 0 || hours > 0 || days > 0) {
        timeAgo += `${minutes} minuto${minutes > 1 ? "s" : ""} `;
      }

      console.log(`Usuario: ${user.email}`);
      console.log(`Última sesión: ${lastConnection}`);
      console.log(`Inactivo desde: ${timeAgo.trim()}`);
      console.log("---");
    });
  }
}

// Delete users with 2 or more days of inactivity
export async function deleteInactives(req, res) {
  const now = new Date();
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  const dateDelete = "two days ago";

  const result = await usersRepository.deleteMany({
    last_connection: { $lt: twoDaysAgo },
  });

  if (result.deletedCount > 0) {
    res.status(200).json({
      success: true,
      data: result,
      message: `Deleted users: ${result.deletedCount}. With last connection more than ${dateDelete}`,
    });
  } else {
    res.status(404).json({
      success: false,
      data: result,
      message: `No inactive users found to delete with last connection more than ${dateDelete}`,
    });
  }
}
