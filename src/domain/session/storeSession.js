import createSession from "./createSession.js";

const storeSession = (
  redis,
  { project_name, protocol, assistant, workspace }
) => {
  let session;
  session = redis.hget(`${project_name}:session:${protocol}`);

  if (!session) {
    session = createSession(
      { assistant, workspace, project_name, protocol },
      redis
    );
    console.log(session);
  }

  return session;
};

export default storeSession;
