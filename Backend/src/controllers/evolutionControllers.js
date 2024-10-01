import axios from "axios";
import config from "../config/config.js";


const API_KEY = config.apikey;
const BASE_URL = config.baseurl;

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
    const response = await axios( `${BASE_URL}/instance/create`, options);
   
    res.status(201).json(response.data);
  } catch (error) {

    res.status(500).send(error.response.data);

  }
};

export default createInstance;