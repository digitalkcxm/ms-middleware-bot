const createSession = ({ assistant, workspace }) => {
    return assistant.createSession({
      assistantId: workspace,
    })
    .then((res) => {
      return res.result.session_id;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export default createSession;
