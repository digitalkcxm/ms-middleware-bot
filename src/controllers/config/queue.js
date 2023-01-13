import { newConnection } from "../../infraestructure/config/rabbitmq.js";
import queue from "../consumers/consumerWatson.js";

const connQueue = await newConnection();

const start = (redis) => queue(connQueue, redis);

export default start;
