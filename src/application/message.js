import post from "../domain/post/watson.js";
import instanceWatson from "../infraestructure/instance/watson/intance.js";
import { publishMessage, sendToQueue } from "../infraestructure/config/rabbitmq.js";

const makeMessage = async  (data) => {
  const { api_key, context, project_name, workspace } = data;
  try {
    const res = await post({
      assistant: instanceWatson(api_key),
      message: context,
      workspace: workspace,
    });
    if (res && res.result) {
      data.context = res.result;
      _sendMessage(data, project_name);
    }
  } catch (err) {
    console.log("error make message", err);
    _retriveMessage(data);
    return false;
  }
};

const _retriveMessage = (data) => {
  return sendToQueue(data, "watson:receive");
};

const _sendMessage = (res, project_name) => {
  publishMessage(res, project_name);
  return true;
};
export default makeMessage;
