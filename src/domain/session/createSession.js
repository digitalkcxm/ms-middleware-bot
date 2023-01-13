const createSession = (
  { assistant, workspace, project_name, protocol },
  redis
) => {
  return assistant
    .createSession({
      assistantId: workspace,
    })
    .then((res) => {
      redis.hset([`${projectName}:session:${protocol}`, res.result.session_id]);
      return res.result.session_id;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export default createSession;
