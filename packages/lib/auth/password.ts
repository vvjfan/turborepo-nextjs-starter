import "server-only";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;
const BCRYPT_PREFIX = "{bcrypt}";

export async function hashPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  return `${BCRYPT_PREFIX}${hash}`;
}

export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const storedHash = hashedPassword.startsWith(BCRYPT_PREFIX)
    ? hashedPassword.slice(BCRYPT_PREFIX.length)
    : hashedPassword;
  return bcrypt.compare(password, storedHash);
}
