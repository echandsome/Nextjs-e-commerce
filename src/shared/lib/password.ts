import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string | null | undefined): Promise<boolean> {
  if (!stored) return false;
  if (!stored.includes(":")) {
    return password === stored;
  }
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  try {
    const derived = (await scryptAsync(password, salt, 64)) as Buffer;
    const storedBuf = Buffer.from(hash, "hex");
    if (derived.length !== storedBuf.length) return false;
    return timingSafeEqual(derived, storedBuf);
  } catch {
    return false;
  }
}
