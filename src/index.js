import env from "./infraestructure/config/dotenv.js";
import redis from "./controllers/config/redis.js";
import start from "./controllers/config/queue.js";
import server from "./controllers/config/server.js";

start(redis);
