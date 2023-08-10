import createSession from "../session/createSession.js";
import storeSession from "../session/storeSession.js";

const post = async (
  { assistant, message, workspace, protocol, project_name },
  redis
) => {
  if (!message) return false
    message.sessionId = await storeSession(redis, { // este message chega false
    project_name,
    protocol,
    assistant,
    workspace,
  });
  console.log("  message.sessionId", message.sessionId);
  if (message.sessionId) {
    if (message.sessionId === 403) return true;

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
            if (session === 403) return true;
            message.sessionId = session;
            return await post(
              {
                assistant,
                message,
                workspace,
                protocol,
                project_name,
              },
              redis
            );
          } else return false;
        } else if (err.status == 500) {
          return await post(
            {
              assistant,
              message,
              workspace,
              protocol,
              project_name,
            },
            redis
          );
        }
        return true;
      });
  } else return false;
};

export default post;
