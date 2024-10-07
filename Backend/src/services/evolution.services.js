import axios from 'axios';
import config from "../config/config.js";

const API_KEY = config.apikey;
const BASE_URL = config.baseurl;

export const getConnectionState = async (instanceName) => {
  const options = {
    method: 'GET',
    headers: {
      apikey: API_KEY,
      'Content-Type': 'application/json',
    },
  };

    const response = await axios(`${BASE_URL}/instance/connectionState/${instanceName}`, options);
    return response.data; 

};

export const deleteLogoutIntance = async (instanceName) => {
  const options = {
    method: "DELETE",
    headers: {
      apikey: API_KEY,
      "Content-Type": "application/json",
    },
  };

  const response = await axios(
    `${BASE_URL}/instance/logout/${instanceName}`,
    options
  );

  return response.data;
  
}

export const deleteInstanceName = async (instanceName) => {

  const options = {
    method: "DELETE",
    headers: {
      apikey: API_KEY,
      "Content-Type": "application/json",
    },
  };

  const response = await axios(
    `${BASE_URL}/instance/delete/${instanceName}`,
    options
  );

  return response.data
  
}

export const setWebSocketName = async (instanceName) => {

  const options = {
    method: "POST",
    headers: {
      apikey: API_KEY,
      "Content-Type": "application/json",
    },
    data: {
      websocket: {
        enabled: true,
        events: [
          "APPLICATION_STARTUP",
          "QRCODE_UPDATED",
          "MESSAGES_SET",
          "MESSAGES_UPSERT",
          "MESSAGES_UPDATE",
          "MESSAGES_DELETE",
          "SEND_MESSAGE",
          "CONTACTS_SET",
          "CONTACTS_UPSERT",
          "CONTACTS_UPDATE",
          "PRESENCE_UPDATE",
          "CHATS_SET",
          "CHATS_UPSERT",
          "CHATS_UPDATE",
          "CHATS_DELETE",
          "GROUPS_UPSERT",
          "GROUP_UPDATE",
          "GROUP_PARTICIPANTS_UPDATE",
          "CONNECTION_UPDATE",
          "LABELS_EDIT",
          "LABELS_ASSOCIATION",
          "CALL",
          "TYPEBOT_START",
          "TYPEBOT_CHANGE_STATUS",
        ],
      },
    },
  };

  const response = await axios(
    `${BASE_URL}/websocket/set/${instanceName}`,
    options
  );

  return response.data;
  
}
