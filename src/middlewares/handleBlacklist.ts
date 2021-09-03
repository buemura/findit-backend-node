import blacklist from "../config/redis";
import jwt from "jsonwebtoken";
import { createHash } from "crypto";
import { promisify } from "util";

const existsAsync = promisify(blacklist.exists).bind(blacklist);
const setAsync = promisify(blacklist.set).bind(blacklist);
const quitRedis = promisify(blacklist.quit).bind(blacklist);

const hashfyToken = (token: string) => {
  return createHash("sha256").update(token).digest("hex");
};

const add = async (token: string) => {
  const decodedToken: any = jwt.decode(token);
  const tokenExpiration = decodedToken.exp;
  const tokenHash = hashfyToken(token);
  await setAsync(tokenHash, "");
  blacklist.expireat(token, tokenExpiration);
};

const tokenExists = async (token: string) => {
  const tokenHash = hashfyToken(token);
  const result = await existsAsync(tokenHash);
  return result === 1;
};

const quit = async () => {
  await quitRedis();
};

const handleBlacklist = { add, tokenExists };

export default handleBlacklist;
