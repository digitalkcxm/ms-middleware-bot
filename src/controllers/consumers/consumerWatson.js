import makeMessage from "../../application/message.js";
export default async function queue(conn = {}, redis = {}) {
  try {
    conn.createChannel((err, ch) => {
      if (err) console.log("Erro ao criar fila => ", err);

      const queueName = `watson:receive`;

      ch.assertQueue(queueName, { durable: true });
      ch.prefetch(10);
      ch.consume(
        queueName,
        async (msg) => {
          const data = JSON.parse(msg.content.toString());
          ch.ack(msg);
          console.log("data ====", data);
          makeMessage(data, redis);
        },
        { noAck: false }
      );
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}
