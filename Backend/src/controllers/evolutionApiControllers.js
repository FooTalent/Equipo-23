import { allContacts } from "../services/chat.services.js";
import {
  getConnectionState,
  deleteInstanceName,
  setWebSocketName,
} from "../services/evolution.services.js";
import { socketEvolution } from "../services/socket.services.js";

export const evolutionApiControllers = async (req, res) => {
  try {
    const instanceName = req.params.instanceName;
    const connect = await getConnectionState(instanceName);

    if (connect.instance.state !== "open") {
      await deleteInstanceName(instanceName);
      await getConnectionState(instanceName);
    }

    await setWebSocketName(instanceName);
    await socketEvolution(instanceName);

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
    res.status(404).json(error.response.data);
  }
};
