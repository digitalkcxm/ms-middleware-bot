import post from "../domain/post/watson.js";
import instanceWatson from "../infraestructure/instance/watson/intance.js";
import {
  publishMessage,
  sendToQueue,
} from "../infraestructure/config/rabbitmq.js";

const makeMessage = async (data, redis) => {
  const { api_key, context, project_name, workspace, protocol } = data;
  try {
    let countRetrieve = await redis.get(`${data.project_name}:botben:${data.protocol}`)

    if (countRetrieve) countRetrieve = JSON.parse(countRetrieve)

    const res = await post(
      {
        assistant: instanceWatson(api_key),
        message: context,
        workspace: workspace,
        protocol: protocol,
        project_name: project_name,
      },
      redis
    );
    if (res && res.result) {
      data.context = res.result;
      _sendMessage(data, project_name);
    } else if (res) {
      return true;
    } else {
      let sum = 0;

      if (!countRetrieve) {
        redis.set(`${data.project_name}:botben:${data.protocol}`, JSON.stringify({ retrieve_bot: sum }));
        _retriveMessage(data, countRetrieve);
      } else if (countRetrieve && countRetrieve.retrieve_bot < 2) {
        sum = countRetrieve.retrieve_bot + 1;
        redis.set(`${data.project_name}:botben:${data.protocol}`, JSON.stringify({ retrieve_bot: sum }));
        _retriveMessage(data, countRetrieve);
      }

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
