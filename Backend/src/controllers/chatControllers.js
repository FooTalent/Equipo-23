import {
  allContacts,
  messages,
  oneContact,
  sendText,
} from "../services/chat.services.js";

// Trae todos los contactos
export const findAllContacts = async (req, res) => {
  const instanceName = req.params.instanceName;

  try {
    const data = await allContacts(instanceName);

    const contacts = data.map((contact) => {
      return {
        remoteJid: contact.remoteJid,
        pushName: contact.pushName,
        profilePicUrl: contact.profilePicUrl,
      };
    });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(404).send(error.response.data);
  }
};

// Trae un contacto existente
export const findOneContact = async (req, res) => {
  const { instanceName, remoteJid } = req.params;

  try {
    const data = await oneContact(instanceName, remoteJid);

    const contact = data.map((contact) => {
      return {
        remoteJid: contact.remoteJid,
        pushName: contact.pushName,
        profilePicUrl: contact.profilePicUrl,
      };
    });
    res.status(200).json(contact);
  } catch (error) {
    res.status(404).send(error.response.data);
  }
};

//Trae los mensajes de un chat

export const findMessages = async (req, res) => {
  const { instanceName, remoteJid } = req.params;

  try {
    const response = await messages(instanceName, remoteJid);

    const chat = {
      total: response.messages.total,
      pages: response.messages.pages,
      currentPage: response.messages.currentPage,
      records: response.messages.records
        .map((record) => {
          return {
            fromMe: record.key.fromMe,
            remoteJid: record.key.remoteJid,
            message: record.message.conversation,
            messageTimestamp: record.messageTimestamp,
          };
        }),
    };
    


    res.status(200).json(chat);
  } catch (error) {
    res.status(404).send(error.response.data);
  }
};

export const sendMesageText = async (req, res) => {
  const { instanceName, number, text } = req.params;

  try {
    const response = await sendText(instanceName, number, text);


    res.status(200).json(response);
  } catch (error) {
    res.status(404).send(error.response.data);
  }
};
