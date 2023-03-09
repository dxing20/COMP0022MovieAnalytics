import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

// scrypt is a callback based function, so we need to promisify it
const scryptAsync = promisify(scrypt);
const SALT_BYTE_LENGTH = 8;

async function generateHash(password: string) {
  const salt = randomBytes(SALT_BYTE_LENGTH).toString("hex");
  const hash = (await scryptAsync(password, salt, 64)) as Buffer;

  return `${salt}${hash.toString("hex")}`;
}

async function compareHash(password: string, hash: string) {
  const salt = hash.substring(0, SALT_BYTE_LENGTH * 2);
  const newHash = (await scryptAsync(password, salt, 64)) as Buffer;

  return `${salt}${newHash.toString("hex")}` === hash;
}

export { generateHash, compareHash };
