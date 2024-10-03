import axios from "axios";
import config from "../config/config.js";

const API_KEY = config.apikey;
const BASE_URL = config.baseurl;

// crear la instancia y conectar con qr la whatsapp
export const createInstance = async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      apikey: API_KEY,
      "Content-Type": "application/json",
    },
    data: {
      instanceName: req.params.instanceName,
      qrcode: true,
      integration: "WHATSAPP-BAILEYS",
    },
  };

  try {
    const response = await axios(`${BASE_URL}/instance/create`, options);

    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).send(error.response.data);
  }
};

// obtener el estado de la conexion con Whatsapp
// el qr no devuelve el estado de la conexion
// como estrategia encuadrar con una ventana el qr,
// y cuando se cierra la ventana verificar el estado de la conexion
export const connectionState = async (req, res) => {
  const instanceName = req.params.instanceName;

  const options = {
    method: "GET",
    headers: {
      apikey: API_KEY,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(
      `${BASE_URL}/instance/connectionState/${instanceName}`,
      options
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).send(error.response.data);
  }
};

// llamar al qr en el caso que no se haya conectado previamente
// en vez de usar connectionState, se puede usar instanceConnect

export const instanceConnect = async (req, res) => {
  const instanceName = req.params.instanceName;

  const options = {
    method: "GET",
    headers: {
      apikey: API_KEY,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(
      `${BASE_URL}/instance/connect/${instanceName}`,
      options
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).send(error.response.data);
  }
};

// si se hace la desconeccion del whatsapp,
// hay que esperar a que devuelva un nuevo qr porque el anterior queda fijo por un tiempo

export const logoutInstance = async (req, res) => {
  const instanceName = req.params.instanceName;

  const options = {
    method: "DELETE",
    headers: {
      apikey: API_KEY,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(
      `${BASE_URL}/instance/logout/${instanceName}`,
      options
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).send(error.response.data);
  }
};

export const deleteInstance = async (req, res) => {
  const instanceName = req.params.instanceName;

  const options = {
    method: "DELETE",
    headers: {
      apikey: API_KEY,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(
      `${BASE_URL}/instance/delete/${instanceName}`,
      options
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).send(error.response.data);
  }
};

//Arrancamos con la conexion al WebSocket

//si o si tengo que conecarta integrations => Event => WebSocket => Post

export const setWebSocket = async (req, res) => {
  const instanceName = req.params.instanceName;

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

  try {
    const response = await axios(
      `${BASE_URL}/websocket/set/${instanceName}`,
      options
    );
    res.status(201).json(response.data);
  } catch (error) {
    res.status(404).send(error.response.data);
  }
};
