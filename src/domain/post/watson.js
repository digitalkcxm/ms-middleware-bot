import createSession from "../session/createSession.js";

const post = ({ assistant, message, workspace }) => {
  return assistant
    .message(message)
    .then((res) => {
      console.log(JSON.stringify(res, null, 2));
      return res;
    })
    .catch(async (err) => {
      console.log("==", err);
      if (err.status === 404 || err.status === 429) {
        const session = await createSession({ assistant, workspace });
        console.log(session);
        if (session) {
          message.sessionId = session;
          post({ assistant, message, workspace });
        }
      }
      return err;
    });
};

export default post;
