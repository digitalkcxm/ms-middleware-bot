import tracing from '../../infraestructure/config/elastic-apm.js';
import { newConnection } from "../../infraestructure/config/rabbitmq.js";
import queue from "../consumers/consumerWatson.js";

const connQueue = await newConnection();

const start = (redis) => queue(connQueue, redis, tracing);

export default start;
