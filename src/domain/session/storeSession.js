import createSession from "./createSession.js";

const storeSession = async (
  redis,
  { project_name, protocol, assistant, workspace }
) => {
  let session;
  session = await redis.get(`${project_name}:session:${protocol}`);
  console.log("session", session);
  if (!session) {
    session = await createSession(
      { assistant, workspace, project_name, protocol },
      redis
    );
    if (!session) return false;
    console.log("session ---->", session);
  }

  return session;
};

export default storeSession;
