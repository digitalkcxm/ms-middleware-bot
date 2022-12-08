import { newConnection } from "../../infraestructure/config/rabbitmq.js";
import queue from "../consumers/consumerWatson.js";

const connQueue = await newConnection();

const start = queue(connQueue);

export default start;
