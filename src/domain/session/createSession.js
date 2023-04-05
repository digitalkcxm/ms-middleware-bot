const createSession = (
  { assistant, workspace, project_name, protocol },
  redis
) => {
  return assistant
    .createSession({
      assistantId: workspace,
    })
    .then((res) => {
      redis.set([`${project_name}:session:${protocol}`, res.result.session_id]);
      return res.result.session_id;
    })
    .catch((err) => {
      console.log(err);
      // 403 acesso negado === credenciais invalidas
      if (err.code === 403) return err.code;
      return false;
    });
};

export default createSession;
