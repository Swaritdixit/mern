import {Ratelimit} from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
dotenv.config();
const redis = new Redis({
  url: 'https://full-octopus-9040.upstash.io',
  token: 'ASNQAAImcDEzNjExMjEzYTY1Yjc0ZmNiYTliNDQ1MzJkMmY5MWMyMHAxOTA0MA',
})

const ratelimit =new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "20 s"),
});
export default ratelimit;