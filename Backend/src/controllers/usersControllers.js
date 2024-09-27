import UserDTO from "../dao/dto/UserDto.js";
import { usersRepository } from "../repositories/index.js";
import { cartsRepository } from "../repositories/index.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { decodedToken, generateTokenResetPassoword } from "../utils/jwt.js";
import config from "../config/config.js";
import { transport } from "../utils/nodemailer.js";
import { removeEmptyObjectFields } from "../utils/removeEmptyObjectFields.js";

export const getUsers = async (req, res) => {
  const role = req.user?.data?.role;
  const email = req.user?.data?.email;

  const users = await usersRepository.getUsers();
  const result = await Promise.all(
    users.map(async (user) => UserDTO.getUserResponseForRole(user, role, email))
  );
  res.status(200).json({ succes: true, data: result });
};

export const getUser = async (req, res) => {
  const id = req.params.uid;
  const role = req.user?.data?.role;
  const email = req.user?.data?.email;

  let user = await usersRepository.getUserBy({ _id: id });
  if (!user) {
    return res.status(404).json({ succes: false, message: "User not found" });
  }

  const userDto = await UserDTO.getUserResponseForRole(user, role, email);
  res.status(201).json({ succes: true, data: userDto });
};

export const deleteUser = async (req, res) => {
  const id = req.params.uid;

  let user = await usersRepository.getUserBy({ _id: id });
  if (!user) {
    return res.status(404).json({ succes: false, message: "User not found" });
  }

  // Delete the cart associated with the user
  await cartsRepository.deleteCartById(user.cartId);

  const userDeleted = await usersRepository.deleteUserBy({ _id: id });
  const userDeletedDto = await UserDTO.getUserResponseForRole(
    userDeleted,
    "admin"
  );
  // Send notification email to deleted user
  try {
    await transport.sendMail({
      from: `E-commerce Coder <${config.correoGmail}>`,
      to: user.email,
      subject: "Usuario eliminado",
      html: `
        <div>
            <p>Tu usuario fue eliminado.</p>
        </div>
      `,
    });
    res.status(200).json({
      success: true,
      data: userDeletedDto,
      message: "User deleted and notification email sent",
    });
  } catch (error) {
    req.logger.info("Error sending email:", error);
    if (error.response && error.response.includes("550")) {
      return res.status(200).json({
        success: true,
        data: userDeletedDto,
        message:
          "User deleted but notification email failed: Email address does not exist",
      });
    }
    res.status(200).json({
      success: true,
      data: userDeletedDto,
      message: "User deleted but notification email failed",
    });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.uid;
  const { first_name, last_name, age, email } = req.body;
  const role = req.user.data.role;
  const eCurrent = req.user.data.email;

  const user = await usersRepository.getUserBy({ _id: id });
  if (!user) {
    return res.status(404).json({ succes: false, message: "User not found" });
  }

  // Check permission for update user
  if (user.email != eCurrent && role != "admin") {
    return res.status(403).json({
      succes: false,
      message: "You do not have permission to update user.",
    });
  }

  // Remove empty fields
  const updatedFields = removeEmptyObjectFields({
    first_name,
    last_name,
    age,
    email,
  });
  const upd = await usersRepository.updateUserBy({ _id: id }, updatedFields);
  const result = await UserDTO.getUserResponseForCurrent(upd);
  res.status(200).json({ success: true, data: result });
};

// Change role 'user' to 'premium' !!!
export const changePremium = async (req, res) => {
  const id = req.params.uid;
  const email = req.user.data.email;
  const role = req.user.data.role;

  let user = await usersRepository.getUserBy({ _id: id });
  if (!user) {
    return res.status(404).json({ succes: false, message: "User not found" });
  }

  /**
   *
   *  Verify documents exists in user
   *
   */

  const requiredDocuments = [
    "identification",
    "proofOfResidence",
    "accountStatement",
  ];
  const userDocumentTypes = user.documents.map((doc) => doc.name);

  const missingDocuments = requiredDocuments.filter(
    (doc) => !userDocumentTypes.includes(doc)
  );

  if (missingDocuments.length > 0) {
    const message = `The following necessary documents are missing: ${missingDocuments.join(
      ", "
    )}`;
    return res.status(200).json({ success: false, data: message });
  }
  const result = await usersRepository.updateUserBy(
    { _id: id },
    { role: "premium" }
  );
  const userDto = await UserDTO.getUserResponseForRole(result, role, email);
  res.status(200).json({ success: true, data: userDto });
};

export const uploadProfilePhoto = async (req, res) => {
  const userId = req.params.uid;
  const photo = req.file;

  //  Verify User and photo if exists

  const user = await usersRepository.getUserBy({ _id: userId });

  if (!user) {
    return res.status(404).json({ succes: false, message: "User not found" });
  }

  if (!photo) {
    return res.status(400).send({ message: "No photo were uploaded." });
  }

  const updateData = {
    profilePhoto: {
      name: photo.originalname,
      reference: `/img/profiles/${photo.filename}`,
    },
  };

  const result = await usersRepository.updateUserBy({ _id: userId}, updateData);
  const userDto = await UserDTO.getUserResponseForRole(result, null, user.email);
  res.status(200).json({
    success: true,
    data: userDto,
    message: "profile photo was uploaded",
  });
};

export const uploadDocuments = async (req, res) => {
  const userId = req.params.uid;
  const files = req.files;
  const email = req.user.data.email;
  const role = req.user.data.role;
  const idUserCurrent = req.user.data._id; 

  if (idUserCurrent != userId) {
    return res.status(403).json({
      succes: false,
      message: "You do not have permission to upload couments",
    });
  }

  if (!files || Object.keys(files).length === 0) {
    return res.status(400).send({ message: "No files were uploaded." });
  }
  
  const user = await usersRepository.getUserBy({ _id: userId });

  if (!user) {
    return res.status(404).json({ succes: false, message: "User not found" });
  }

  const existingDocuments = user.documents || [];

  const documentMap = existingDocuments.reduce((map, doc) => {
    map[doc.name] = doc;
    return map;
  }, {});
  const fileFields = ["identification", "proofOfResidence", "accountStatement"];

  fileFields.forEach((field) => {
    if (files[field]) {
      files[field].forEach((file) => {
        if (documentMap[field]) {
          documentMap[field] = {
            name: field,
            originalname: file.originalname,
            reference: file.path,
          };
        } else {
          documentMap[field] = {
            name: field,
            originalname: file.originalname,
            reference: file.path,
          };
        }
      });
    }
  });

  const updatedDocuments = Object.values(documentMap);

  if (updatedDocuments.length > 0) {
    const updateData = {
      $set: {
        documents: updatedDocuments,
      },
    };

    const result = await usersRepository.updateUserBy(
      { _id: userId },
      updateData
    );
    const userDto = await UserDTO.getUserResponseForRole(result, role, email);
    res.status(200).json({ succes: true, data: userDto });
  } else {
    res.status(404).json({ succes: false, message: "No valid files" });
  }
};

const environment = config.environment;

export async function sendEmailToResetPassword(req, res) {
  const appUrl = environment === 'development'? `${config.AppUrl}:${config.port}`:`${config.AppUrl}`

  const { email } = req.body;
  const user = await usersRepository.getUserBy({ email: email });
  if (!user) {
    return res.status(404).json({ succes: false, message: "User not found" });
  }

  const token = generateTokenResetPassoword({ email: email });

  // Send email !!  ----

  const resetLink = `${appUrl}/resetPassword?token=${token}`;
  const result = await transport.sendMail({
    from: `E-commerce Coder <${config.correoGmail}>`,
    to: email,
    subject: "Reestablecer contraseña",
    html: `
          <div>
              <a href="${resetLink}">Reestablecer mi contraseña</a>
          </div>
          `,
    attachments: [],
  });

  // Response
  res.status(200).json({ succes: true, data: result });
}

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  // Decoded data
  const decoded = decodedToken(token);
  const email = decoded.data.email;
  const user = await usersRepository.getUserBy({ email: email });

  if (isValidPassword(user, password)) {
    res
      .status(404)
      .json({ success: false, message: "The password is the same" });
  }

  // Hash password
  const passwordHash = createHash(password);

  const result = await usersRepository.updateUserBy(
    { _id: user._id },
    { password: passwordHash }
  );

  const userDto = await UserDTO.getUserResponseForRole(result, null, email);
  res.status(200).json({ succes: true, data: userDto });
};
