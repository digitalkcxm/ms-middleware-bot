import redis from "ioredis";

export default function newConnection() {
  return new redis(process.env.REDIS_PORT, process.env.REDIS_HOST, {
    maxRetriesPerRequest: 10,
  });
}
