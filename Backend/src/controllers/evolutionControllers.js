import axios from "axios";
import config from "../config/config.js";
import {
  getConnectionState,
  deleteLogoutIntance,
  deleteInstanceName,
  setWebSocketName,
} from "../services/evolution.services.js";

const API_KEY = config.apikey;
const BASE_URL = config.baseurl;

export const createInstance = async (req, res) => {
  try {
    const instanceName = req.params.instanceName;

    if (!instanceName || instanceName === ":instanceName") {
      return res.status(400).json({
        status: 400,
        error: "Bad Request",
        response: {
          message: ["Instance name is missing"],
        },
      });
    }

    const options = {
      method: "POST",
      headers: {
        apikey: API_KEY,
        "Content-Type": "application/json",
      },
      data: {
        instanceName,
        qrcode: true,
        integration: "WHATSAPP-BAILEYS",
      },
    };

    const response = await axios(`${BASE_URL}/instance/create`, options);

    const instance = {
      instanceName: response.data.instance.instanceName,
      qrcode: response.data.qrcode,
    };

    return res.status(201).json(instance);
  } catch (error) {
    if (error.status === 403) {
      return res.status(403).send(error.response.data);
    }

    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
      response: {
        message: [error.message],
      },
    });
  }
};

export const connectionState = async (req, res) => {
  const instanceName = req.params.instanceName;

  try {
    const data = await getConnectionState(instanceName);
    res.status(200).json(data);
  } catch (error) {
   
    res.status(404).json(error.response.data );
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
    res.status(404).json(error.response.data );
  }
};

// si se hace la desconeccion del whatsapp,
// hay que esperar a que devuelva un nuevo qr porque el anterior queda fijo por un tiempo

export const logoutInstance = async (req, res) => {
  const instanceName = req.params.instanceName;

  try {
    const data = await deleteLogoutIntance(instanceName);

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.response.data );
  }
};

export const deleteInstance = async (req, res) => {
  const instanceName = req.params.instanceName;

  try {
    const data = await deleteInstanceName(instanceName);

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.response.data );
  }
};

export const setWebSocket = async (req, res) => {
  const instanceName = req.params.instanceName;

  try {
    const data = await setWebSocketName(instanceName);

    res.status(201).json(data);
  } catch (error) {
    res.status(404).json(error.response.data );
  }
  
};



