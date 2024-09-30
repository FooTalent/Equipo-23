import axios from "axios";
import config from "../config/config.js";

// export const createInstance = (req, res) => {
//   res.send("Instancia creada");
// };

const API_KEY = config.apikey;
const BASE_URL = config.baseUrl;

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
    const response = await axios( `${BASE_URL}/instances/create`, options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear la instancia");
  }
};

export default createInstance;
