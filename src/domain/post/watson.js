import createSession from "../session/createSession.js";
import storeSession from "../session/storeSession.js";
const post = async (
  { assistant, message, workspace, protocol, project_name },
  redis
) => {
  message.sessionId = await storeSession(redis, {
    project_name,
    protocol,
    assistant,
    workspace,
  });
  console.log('  message.sessionId',  message.sessionId)
  if (message.sessionId) {
    return assistant
      .message(message)
      .then((res) => {
        console.log(JSON.stringify(res, null, 2));
        return res;
      })
      .catch(async (err) => {
        console.log("==", err);
        if (err.status === 404 || err.status === 429) {
          const session = await createSession(
            { assistant, workspace, project_name, protocol },
            redis
          );
          console.log(session);
          if (session) {
            message.sessionId = session;
            post({ assistant, message, workspace });
          }
        }
        return err;
      });
  }
};

export default post;
