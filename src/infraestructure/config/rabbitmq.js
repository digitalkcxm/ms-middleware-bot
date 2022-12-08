import amqp from "amqplib/callback_api.js";

if (!global._connRabbitGlobal) {
  global._connRabbitGlobal = false;
}

export async function newConnection() {
  if (global._connRabbitGlobal) {
    return global._connRabbitGlobal;
  }

  const rabbitmqUser = process.env.RABBITMQ_USER;
  const rabbitmqPass = process.env.RABBITMQ_PASSWORD;
  const rabbitmqHost = process.env.RABBITMQ_HOST;
  const rabbitmqPort = process.env.RABBITMQ_PORT;

  const connStr = `amqp://${rabbitmqUser}:${rabbitmqPass}@${rabbitmqHost}:${rabbitmqPort}`;

  const connRabbit = await new Promise((resolve, reject) => {
    amqp.connect(connStr + "?heartbeat=20", function (err, conn) {
      if (err) {
        console.log(
          `Global connection with rabbitmq failed with error: ${err.message}`
        );
        return setTimeout(function () {
          newConnection();
        }, 1000);
      }
      conn.on("error", function (err) {
        if (err.message !== "Connection closing") {
          console.log(
            `Global connection with rabbitmq failed with error: ${err.message}`
          );
          reject(err);
        }
      });
      conn.on("close", function () {
        console.log(
          `Global Connection with rabbitmq was close, restart api to try reconnect`
        );
        return setTimeout(function () {
          global._connRabbitGlobal = false;
          newConnection();
        }, 1000);
      });

      resolve(conn);
      console.log(`Global connection with rabbitmq successful`);
    });
  });

  global._connRabbitGlobal = connRabbit;

  return global._connRabbitGlobal;
}

export function sendToQueue(data, queue) {
  const conn = global._connRabbitGlobal;
  return conn.createChannel((err, ch) => {
    if (err) console.log("erro ao criar a fila", err);

    ch.assertQueue(queue, { durable: true });
    ch.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
      persistent: true,
    });
    ch.close();
  });
  
}
