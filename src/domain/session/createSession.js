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
      //Esse erro tem o mesmo codigo que outro, por isso atribuo um status 403 que está mapeado para a api ignorar essa mensagem.
      if (err?.body?.errorMessage === "Provided API key could not be found")
        err.Code = 403;

      // 403 acesso negado === credenciais invalidas
      if (err.code === 403) return err.code;

      return false;
    });
};

export default createSession;
