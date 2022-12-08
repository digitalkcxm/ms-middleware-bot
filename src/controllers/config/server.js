import http from "http";
import app from "../../infraestructure/config/express.js";
import bodyParser from "../../infraestructure/config/body-parser.js";
import cors from "../../infraestructure/config/cors.js";
import helmet from "../../infraestructure/config/helmet.js";

const server = http.createServer(app);
app.use(bodyParser);
cors(app);
app.use(helmet());

app.get("/health", (req, res) =>
  res.status(200).send({
    Api: {
      status: "On",
    },
  })
);

const port = process.env.PORT;

server.listen(port, () => console.log(`SERVER RUNNING IN PORT ${port}`));

export default server;
