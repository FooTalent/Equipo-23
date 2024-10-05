import axios from "axios";
import config from "../config/config.js";

const API_KEY = config.apikey;
const BASE_URL = config.baseurl;

// Trae todos los contactos
export const findAllContacts = async (req, res) => {
  const instanceName = req.params.instanceName;

  const options = {
    method: "POST",
    headers: {
      apikey: API_KEY,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(
      `${BASE_URL}/chat/findContacts/${instanceName}`,
      options
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).send(error.response.data);
  }
};

export const findOneContact = async (req, res) => {
  const { instanceName, remoteJid } = req.params;

  const options = {
    method: "POST",
    headers: {
      apikey: API_KEY,
      "Content-Type": "application/json",
    },
    data: {
      where: {
        remoteJid,
      },
    },
  };

  try {
    const response = await axios(
      `${BASE_URL}/chat/findContacts/${instanceName}`,
      options
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).send(error.response.data);
  }
};

export const findMessages = async (req, res) => {
  const { instanceName, remoteJid } = req.params;

  const options = {
    method: "POST",
    headers: {
      apikey: API_KEY,
      "Content-Type": "application/json",
    },
    data: {
      where: {
        key: {
          remoteJid
        }
      }
    },
  };

  try {
    const response = await axios(
      `${BASE_URL}/chat/findMessages/${instanceName}`,
      options
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).send(error.response.data);
  }
};
