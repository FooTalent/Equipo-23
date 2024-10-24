import axios from "axios";
import config from "../config/config.js";

const API_KEY = config.apikey;
const BASE_URL = config.baseurl;

export const allContacts = async (instanceName) => {
  const options = {
    method: "POST",
    headers: {
      apikey: API_KEY,
      "Content-Type": "application/json",
    },
  };

  const response = await axios(
    `${BASE_URL}/chat/findContacts/${instanceName}`,
    options
  );

  return response.data;
};

export const oneContact = async (instanceName, remoteJid) => {
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

  const response = await axios(
    `${BASE_URL}/chat/findContacts/${instanceName}`,
    options
  );

  return response.data;
};

export const messages = async (instanceName, remoteJid) => {
  const options = {
    method: "POST",
    headers: {
      apikey: API_KEY,
      "Content-Type": "application/json",
    },
    data: {
      where: {
        key: {
          remoteJid,
        },
      },
    },
  };

  const response = await axios(
    `${BASE_URL}/chat/findMessages/${instanceName}`,
    options
  );

  return response.data;
};

export const sendText = async (instanceName, number, text) => {
  const options = {
    method: "POST",
    headers: {
      apikey: API_KEY,
      "Content-Type": "application/json",
    },
    data: {
      number,
      text,
    },
  };

  const response = await axios(
    `${BASE_URL}/message/sendText/${instanceName}`,
    options
  );


  return response.data;
};
