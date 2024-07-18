// import { createClient } from "redis";
import { env } from "~/env";
import { Redis } from "ioredis";

// const client = createClient({
//   password: "RuY4GbarlviIOIcXjwZbpsrspwOi2Wqu",
//   socket: {
//     host: env.REDIS_URL,
//     port: 19533,
//   },
// });

// client.on("error", (err) => console.log("Redis Client Error", err));

// // Connect to Redis
// await client.connect();

// const client = new Redis({
//   password: "RuY4GbarlviIOIcXjwZbpsrspwOi2Wqu",
//   host: env.REDIS_URL,
//   port: 19533,
// });
const client = new Redis();

export default client;
